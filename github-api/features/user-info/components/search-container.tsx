'use client';
import { useState } from 'react';
import { GitHubUser, GitHubRepo } from '@/typing/typing';
import { getGitHubRepos, getGitHubUser } from '../services/get-github-info';
import { toast } from 'sonner';
import SearchForm from './search-form';
import UserProfile from './user-profile';

export default function GitHubSearchContainer() {
    const [query, setQuery] = useState('');
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (username: string, pageNumber: number = 1) => {
        if (!username) return;
        setLoading(true);

        try {
            const userData = await getGitHubUser(username);
            if (!userData || userData.public_repos == 0) {
                throw new Error("No Public Repo");
            }
            const repoData = await getGitHubRepos(username, pageNumber);

            const sortedRepos = [...repoData].sort((a, b) => b.stargazers_count - a.stargazers_count);

            setUser(userData);

            setRepos(sortedRepos);
            setPage(pageNumber);

            toast.success(`Found ${userData.name || userData.login}`);
        } catch (err) {
            setUser(null);
            setRepos([]);

            let message = "An unexpected error occurred";
            if (err instanceof Error) {
                console.log("Caught error message:", err.message);
                if (err.message === "USER_NOT_FOUND" || err.message.includes("Not Found")) {
                    message = `User "${username}" not found`;
                } else if (err.message === "RATE_LIMIT" || err.message.includes("403")) {
                    message = "GitHub API rate limit exceeded";
                } else if (err.message === "EMPTY_REPOS") {
                    message = "This user has no public repositories";
                } else {
                    message = err.message
                }
            }

            toast.error(message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="search-container">
            <header className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight">GitHub Explorer</h1>
            </header>
            <SearchForm
                query={query}
                setQuery={setQuery}
                onSearch={() => handleSearch(query, 1)}
                loading={loading}
            />

            {user && (
                <UserProfile
                    user={user}
                    repos={repos}
                    page={page}
                    onPageChange={(newPage) => handleSearch(query, newPage)}
                />
            )}
        </main>
    );
}