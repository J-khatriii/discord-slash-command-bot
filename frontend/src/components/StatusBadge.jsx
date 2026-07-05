const STATUS_STYLES = {
  processed: { bg: "bg-console-accent/10", text: "text-console-accent", dot: "bg-console-accent" },
  sent: { bg: "bg-console-accent/10", text: "text-console-accent", dot: "bg-console-accent" },
  pending: { bg: "bg-console-warn/10", text: "text-console-warn", dot: "bg-console-warn" },
  failed: { bg: "bg-console-danger/10", text: "text-console-danger", dot: "bg-console-danger" },
  not_applicable: { bg: "bg-console-border/40", text: "text-console-muted", dot: "bg-console-muted" },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.not_applicable;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
