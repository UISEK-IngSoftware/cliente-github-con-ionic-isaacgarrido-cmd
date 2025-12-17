import axios from "axios";
import { RepositoryItem } from "../interfaces/Repositoryitem";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = "github_pat_xxxxxxxxxxxxxxxxx";//remplazar por token valido    

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`
            },
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc"
            }
        });

        const reposData: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner?.avatar_url || null,
            owner: repo.owner?.login ||null,
            language: repo.language || null
        }));

    return reposData;
}   catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};