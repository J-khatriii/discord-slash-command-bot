const STATUS_STYLES = {
  processed: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${style.bg} ${style.text}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
