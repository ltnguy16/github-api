import { GitHubUser, GitHubRepo } from '@/typing/typing';

interface UserProfileProps {
    user: GitHubUser;
    repos: GitHubRepo[];
    page: number;
    onPageChange: (page: number) => void;
}

export default function UserProfile({ user, repos, page, onPageChange }: UserProfileProps) {
    return (
        <div className="mt-8 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex items-center gap-4">
                <img src={user.avatar_url} className="w-16 h-16 rounded-full border" alt={user.login} />
                <div>
                    <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                    <p className="text-gray-600 italic">{user.bio || "No bio available"}</p>
                    <p className="text-sm font-semibold">{user.followers.toLocaleString()} Followers</p>
                </div>
            </div>

            {/* Repos section */}
            <h3 className="mt-6 font-bold border-b pb-2">Public Repositories (Sorted by Stars)</h3>
            <ul className="mt-4 space-y-2">
                {repos.map(repo => (
                    <li key={repo.id} className="p-3 border rounded hover:bg-gray-50 flex justify-between items-center transition-colors">
                        <a href={repo.html_url} target="_blank" className="font-medium text-blue-600 hover:underline">
                            {repo.name}
                        </a>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">⭐ {repo.stargazers_count}</span>
                    </li>
                ))}
            </ul>

            {/* Pagination controls */}
            <div className="flex gap-4 mt-6 items-center justify-center">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-4 py-1 bg-gray-200 rounded disabled:opacity-30 hover:bg-gray-300 transition-colors"
                > Previous </button>
                <span className="font-medium text-sm text-gray-500 uppercase tracking-widest">Page {page}</span>
                <button
                    disabled={repos.length < 5}
                    onClick={() => onPageChange(page + 1)}
                    className="px-4 py-1 bg-gray-200 rounded disabled:opacity-30 hover:bg-gray-300 transition-colors"
                > Next </button>
            </div>
        </div>
    );
}