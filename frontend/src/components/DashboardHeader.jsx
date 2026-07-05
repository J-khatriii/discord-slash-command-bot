const DashboardHeader = ({ onRefresh, username, onLogout }) => {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-console-border pb-6">
      <div>
        <div className="flex items-center gap-2">
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-console-text">
          Command Activity
        </h1>
        {username && (
          <p className="mt-1 font-mono text-xs text-console-muted">signed in as {username}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className="rounded-md border border-console-border bg-console-panel px-4 py-2 font-mono text-sm text-console-text transition hover:border-console-accent hover:text-console-accent"
        >
          ↻ refresh
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            className="rounded-md border border-console-border px-4 py-2 font-mono text-sm text-console-muted transition hover:border-console-danger hover:text-console-danger"
          >
            log out
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
