// Detailed User Profile
export interface GitHubUser {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    followers: number;
    public_repos: number;
}

// Repository Object
export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    html_url: string;
    fork: boolean;
}

// Error Handling state
export type SearchError = 'NOT_FOUND' | 'RATE_LIMITED' | 'NETWORK_ERROR' | 'EMPTY_REPOS' | null;