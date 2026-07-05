const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="mt-8">
      <div className="relative max-w-md">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-console-muted">
          /
        </span>
        <input
          type="text"
          placeholder="filter by username or command..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-console-border bg-console-panel py-2.5 pl-8 pr-4 font-mono text-sm text-console-text outline-none transition placeholder:text-console-muted focus:border-console-accent focus:ring-1 focus:ring-console-accent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
