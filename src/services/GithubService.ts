import axios from "axios";
import { RepositoryItem } from "../interfaces/Repositoryitem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService"

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
//const GITHUB_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`;//remplazar por token valido

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use(
  (config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
      config.headers.Authorization = authHeader;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const authHeader = AuthService.getAuthHeader();
    console.log("Auth header:", authHeader ? "Present" : "Missing");
    const response = await githubApi.get(`/user/repos`, {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation:"owner"
      },
    });

    console.log("API Response:", response.data);

    const repositories: RepositoryItem[] = response.data.map((repo: { name: string; owner?: { login: string; avatar_url: string }; description?: string; language?: string }) => ({
      name: repo.name,
      owner: repo.owner ? repo.owner.login : null,
      description: repo.description ? repo.description : null,
      imageUrl: repo.owner ? repo.owner.avatar_url : null,
      language: repo.language ? repo.language : null,
    }));

    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const createRepository = async (repo: RepositoryItem): Promise<RepositoryItem> => {
  try {
    const response = await githubApi.post(`/user/repos`, repo);
    console.log("Repository creado:", response.data);
    const createdRepo: RepositoryItem = {
      name: response.data.name,
      owner: response.data.owner ? response.data.owner.login : null,
      description: response.data.description ? response.data.description : null,
      imageUrl: response.data.owner ? response.data.owner.avatar_url : null,
      language: response.data.language ? response.data.language : null,
    };
    return createdRepo;
  } catch (error) {
    console.error("Error creando repository:", error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await githubApi.get(`/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export const updateRepository = async (owner: string, repo: string, data: Partial<RepositoryItem>): Promise<void> => {
  try {
    const response = await githubApi.patch(`/repos/${owner}/${repo}`, data);
    console.log("Repository updated:", response.data);
  } catch (error) {
    console.error("Error updating repository:", error);
    throw error;
  }
};

export const deleteRepository = async (owner: string, repo: string): Promise<void> => {
  try {
    await githubApi.delete(`/repos/${owner}/${repo}`);
    console.log("Repository deleted");
  } catch (error) {
    console.error("Error deleting repository:", error);
    throw error;
  }
};
