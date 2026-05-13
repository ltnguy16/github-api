'use client'
import { GitHubUser, GitHubRepo } from '@/typing/typing';

// Fetch Basic User Info
export async function getGitHubUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2026-03-10",
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

// Fetch Repos with Sorting and Pagination
export async function getGitHubRepos(username: string, page: number): Promise<GitHubRepo[]> {
    const response = await fetch(
        `https://api.github.com/search/repositories?q=user:${username}+fork:true&per_page=5&page=${page}`,
        {
            headers: {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2026-03-10",
            }
        }
    );

    if (!response.ok) throw new Error("Failed to fetch repos");

    const data = await response.json();
    return data.items;
}