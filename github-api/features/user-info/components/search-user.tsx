'use client'
import { GitHubUser, GitHubRepo } from '@/typing/typing';
import { getGitHubRepos, getGitHubUser } from '../services/get-github-info'
import { useState } from 'react';

export default function SearchUser() {
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
            // Run both fetches
            const userData = await getGitHubUser(username);
            const repoData = await getGitHubRepos(username, pageNumber);

            const sortedRepos = [...repoData].sort((a, b) => b.stargazers_count - a.stargazers_count);

            setUser(userData);
            setRepos(sortedRepos);
            setPage(pageNumber);
        } catch (err: any) {
            console.error("Error Fetching GitHub data:", err);
            setUser(null);
            setRepos([]);
            setError(err.message === "Not Found" ? "User not found" : "Rate limit exceeded or network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 text-black">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="flex gap-2">
                <input
                    className="border p-2 flex-grow rounded"
                    placeholder="Enter GitHub username"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="bg-black text-white px-4 py-2 rounded">Search</button>
            </form>


            {/* Profile Display */}
            {user && (
                <div className="mt-8">
                    <div className="flex items-center gap-4">
                        <img src={user.avatar_url} className="w-16 h-16 rounded-full" alt={user.login} />
                        <div>
                            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                            <p className="text-gray-600">{user.bio}</p>
                            <p className="text-sm font-semibold">{user.followers} Followers</p>
                        </div>
                    </div>

                    {/* Repositories List */}
                    <h3 className="mt-6 font-bold border-b pb-2">Public Repositories (Sorted by Stars)</h3>
                    <ul className="mt-4 space-y-2">
                        {repos.map(repo => (
                            <li key={repo.id} className="p-3 border rounded hover:bg-gray-50 flex justify-between">
                                <a href={repo.html_url} target="_blank" className="font-medium text-blue-600">{repo.name}</a>
                                <span className="text-sm">⭐ {repo.stargazers_count}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination Controls */}
                    <div className="flex gap-4 mt-6 items-center">
                        <button
                            disabled={page === 1}
                            onClick={() => { setPage(p => p - 1); handleSearch(query, page - 1); }}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        > Previous </button>
                        <span>Page {page}</span>
                        <button
                            disabled={repos.length < 5}
                            onClick={() => { setPage(p => p + 1); handleSearch(query, page + 1); }}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        > Next </button>
                    </div>
                </div>
            )}
        </div>
    )
}