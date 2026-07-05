const SearchBar = ({search, onSearchChange}) => {
  return (
    <div className="mt-8">
      <input
        type="text"
        placeholder="Search by username or command..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
