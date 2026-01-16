import axios from "axios";
import { RepositoryItem } from "../interfaces/Repositoryitem";
import { UserInfo } from "../interfaces/UserInfo";


const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`;//remplazar por token valido    

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {
                Authorization: GITHUB_TOKEN
            },
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation:"owner"
            }
        });

        console.log('API Response:', response.data);

        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner ? repo.owner.login : null,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner ? repo.owner.avatar_url : null,
            language: repo.language ? repo.language : null,
        }));

    return repositories;
}   catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};

export const createRepository = async (repo: RepositoryItem) : Promise<void> => {
    try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repo,{
        headers: {
            Authorization: GITHUB_TOKEN,
        },
    });
    console. log("Repository creado:", response. data)
    } catch (error) {
        console.error("Error creando repository:", error);
    }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/user`, {
        headers: {
            Authorization: GITHUB_TOKEN,
        },
    })
    return response.data;
    } catch (error){
        console.error("Error fetching user info:", error);
        return null;
    }
}