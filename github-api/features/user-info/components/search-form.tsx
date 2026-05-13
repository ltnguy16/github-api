interface SearchFormProps {
    query: string;
    setQuery: (val: string) => void;
    onSearch: () => void;
    loading: boolean;
}

export default function SearchForm({ query, setQuery, onSearch, loading }: SearchFormProps) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSearch(); }
        } className="flex gap-2" >
            <input
                className="border p-2 flex-grow rounded"
                placeholder="Enter GitHub username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            < button
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
}