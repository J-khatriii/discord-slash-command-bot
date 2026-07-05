const DashboardHeader = ({ onRefresh }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        Discord Dashboard
      </h1>

      <button
        onClick={onRefresh}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  );
};

export default DashboardHeader;
