import StatusBadge from "./StatusBadge.jsx";

const SortIcon = ({ active, direction }) => {
  if (!active) return <span className="ml-1 text-console-muted/50">↕</span>;
  return <span className="ml-1 text-console-accent">{direction === "asc" ? "↑" : "↓"}</span>;
};

const InteractionTable = ({ interactions, sorting, onSort }) => {
  if (interactions.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-console-border bg-console-panel p-12 text-center">
        <p className="font-mono text-sm text-console-muted">— no interactions logged yet —</p>
      </div>
    );
  }

  const headers = [
    { key: "username", label: "User" },
    { key: "command", label: "Command" },
    { key: "status", label: "Status" },
    { key: null, label: "Mirror" },
    { key: "createdAt", label: "Timestamp" },
  ];

  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-console-border bg-console-panel">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-console-border">
            {headers.map((h) => (
              <th
                key={h.label}
                onClick={h.key ? () => onSort(h.key) : undefined}
                className={`px-6 py-3 text-left font-mono text-xs uppercase tracking-widest text-console-muted ${
                  h.key ? "cursor-pointer select-none hover:text-console-text" : ""
                }`}
              >
                {h.label}
                {h.key && <SortIcon active={sorting.sortBy === h.key} direction={sorting.sortOrder} />}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {interactions.map((interaction) => (
            <tr
              key={interaction.id}
              className="border-b border-console-border/60 transition-colors last:border-0 hover:bg-console-panel-hover"
            >
              <td className="px-6 py-4 text-sm text-console-text">{interaction.username}</td>
              <td className="px-6 py-4">
                <span className="rounded bg-console-bg px-2 py-1 font-mono text-xs text-console-link">
                  /{interaction.commandName}
                </span>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={interaction.status} />
              </td>
              <td className="px-6 py-4" title={interaction.mirrorError ?? ""}>
                <StatusBadge status={interaction.mirrorStatus} />
              </td>
              <td className="px-6 py-4 font-mono text-xs text-console-muted">
                {new Date(interaction.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractionTable;
