interface SearchFormProps {
    query: string;
    setQuery: (val: string) => void;
    onSearch: () => void;
    loading: boolean;
}

export default function SearchForm({ query, setQuery, onSearch, loading }: SearchFormProps) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="search-form">
            <input
                className="input-field"
                placeholder="Enter GitHub username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            < button
                disabled={loading}
                className="btn-primary flex-shrink-0"
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
}