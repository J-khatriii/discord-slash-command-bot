const Pagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="mt-6 text-center">
      <p>
        Page {page} of {totalPages}
      </p>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={onPrevious}
          className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={onNext}
          className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
