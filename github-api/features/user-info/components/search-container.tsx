'use client';
import { useState } from 'react';
import { GitHubUser, GitHubRepo } from '@/typing/typing';
import { getGitHubRepos, getGitHubUser } from '../services/get-github-info';
import SearchForm from './search-form';
import UserProfile from './user-profile';

export default function GitHubSearchContainer() {
    const [query, setQuery] = useState('');
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (username: string, pageNumber: number = 1) => {
        if (!username) return;
        setLoading(true);
        setError(null);

        try {
            const userData = await getGitHubUser(username);
            const repoData = await getGitHubRepos(username, pageNumber);

            // GitHub User Repos endpoint doesn't support star sorting natively,
            // so we keep your manual sort here.
            const sortedRepos = [...repoData].sort((a, b) => b.stargazers_count - a.stargazers_count);

            setUser(userData);
            setRepos(sortedRepos);
            setPage(pageNumber);
        } catch (err) {
            setUser(null);
            setRepos([]);

            if (err instanceof Error) {
                setError(err.message.includes("Not Found") ? "User not found" : "Error fetching data");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 text-black">
            <SearchForm
                query={query}
                setQuery={setQuery}
                onSearch={() => handleSearch(query, 1)}
                loading={loading}
            />

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {user && (
                <UserProfile
                    user={user}
                    repos={repos}
                    page={page}
                    onPageChange={(newPage) => handleSearch(query, newPage)}
                />
            )}
        </div>
    );
}