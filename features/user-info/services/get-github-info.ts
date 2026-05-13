'use server'
import { GitHubUser, GitHubRepo } from '@/typing/typing';
import { config } from '../components/config';

// Fetch Basic User Info
export async function getGitHubUser(username: string): Promise<GitHubUser> {
    const headers = new Headers({
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
    });

    if (config.githubToken && config.githubToken.trim() !== "") {
        headers.set("Authorization", `Bearer ${config.githubToken.trim()}`);
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers
    });

    if (response.status === 404) throw new Error("USER_NOT_FOUND");
    if (response.status === 403) throw new Error("RATE_LIMIT");
    if (!response.ok) throw new Error("GENERIC_ERROR");

    return await response.json();
}

// Fetch Repos with Sorting and Pagination
export async function getGitHubRepos(username: string, page: number): Promise<{ items: GitHubRepo[], totalCount: number }> {
    const headers = new Headers({
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
    });

    if (config.githubToken && config.githubToken.trim() !== "") {
        headers.set("Authorization", `Bearer ${config.githubToken.trim()}`);
    }

    const response = await fetch(
        `https://api.github.com/search/repositories?q=user:${username}+fork:false&per_page=6&page=${page}`,
        {
            headers
        }
    );

    if (response.status === 403) throw new Error("RATE_LIMIT");
    if (!response.ok) throw new Error("Failed to fetch repos");

    const data = await response.json();

    return {
        items: data.items || [],
        totalCount: data.total_count || 0
    };
}