const Pagination = ({ page, totalPages, onPrevious, onNext }) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={onPrevious}
        className="rounded-md border border-console-border bg-console-panel px-4 py-2 font-mono text-sm text-console-text transition hover:border-console-accent hover:text-console-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-console-border disabled:hover:text-console-text"
      >
        prev
      </button>

      <p className="font-mono text-xs text-console-muted">
        page {page} / {totalPages}
      </p>

      <button
        disabled={page === totalPages}
        onClick={onNext}
        className="rounded-md border border-console-border bg-console-panel px-4 py-2 font-mono text-sm text-console-text transition hover:border-console-accent hover:text-console-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-console-border disabled:hover:text-console-text"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
