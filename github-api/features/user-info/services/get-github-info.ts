'use server'
import { GitHubUser, GitHubRepo } from '@/typing/typing';
import { config } from '../components/config';

// Fetch Basic User Info
export async function getGitHubUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2026-03-10",
            "Authorization": `Bearer ${config.githubToken}`,
        }
    });

    if (response.status === 404) throw new Error("USER_NOT_FOUND");
    if (response.status === 403) throw new Error("RATE_LIMIT");
    if (!response.ok) throw new Error("GENERIC_ERROR");

    return await response.json();
}

// Fetch Repos with Sorting and Pagination
export async function getGitHubRepos(username: string, page: number): Promise<GitHubRepo[]> {
    const response = await fetch(
        `https://api.github.com/search/repositories?q=user:${username}+fork:true&per_page=6&page=${page}`,
        {
            headers: {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2026-03-10",
                "Authorization": `Bearer ${config.githubToken}`,
            }
        }
    );

    if (!response.ok) throw new Error("Failed to fetch repos");

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        throw new Error("Not Found");
    }

    return data.items;
}