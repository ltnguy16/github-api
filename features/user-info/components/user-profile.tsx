import { GitHubUser, GitHubRepo } from '@/typing/typing';

interface UserProfileProps {
    user: GitHubUser;
    repos: GitHubRepo[];
    page: number;
    totalCount: number;
    onPageChange: (page: number) => void;
}

export default function UserProfile({ user, repos, page, totalCount, onPageChange }: UserProfileProps) {
    const totalPages = Math.ceil(totalCount / 6);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="profile-card">
                <img src={user.avatar_url} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" alt={user.login} />
                <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold">{user.name || user.login}</h2>
                    <p className="text-gray-500 mt-1 italic">{user.bio || "No bio available"}</p>
                    <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                        <span className="stat-badge">Follower - {user.followers}</span>
                        <span className="stat-badge">Repo - {user.public_repos}</span>
                    </div>
                </div>
            </section>

            <div className="mt-12">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Top Repositories</h3>
                    <div className="h-1 flex-grow mx-4 bg-gray-100 rounded-full" />
                </div>
                <ul className="repo-grid">
                    {repos.map(repo => (
                        <li key={repo.id} className="repo-card">
                            <div className="space-y-1">
                                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {repo.name}
                                </h4>
                                {repo.language && (
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                        {repo.language}
                                    </p>
                                )}
                            </div>
                            <span className="star-badge">⭐ {repo.stargazers_count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <footer className="flex items-center justify-between mt-12 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="btn-pagination"
                >
                    ← Previous
                </button>

                <span className="text-xs font-black uppercase tracking-widest text-[var(--teal-mid)]">
                    Page {page} of {totalPages || 1}
                </span>

                <button
                    disabled={repos.length < 5}
                    onClick={() => onPageChange(page + 1)}
                    className="btn-pagination"
                >
                    Next →
                </button>
            </footer>
        </div>
    );
}