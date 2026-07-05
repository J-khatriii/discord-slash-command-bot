import StatusBadge from "./StatusBadge.jsx";

const InteractionTable = ({ interactions, sorting, onSort }) => {
  if (interactions.length === 0) {
    return (
      <div className="mt-8 rounded-lg bg-white p-8 text-center shadow">
        <p className="text-gray-500">
          No interactions found.
        </p>
      </div>
    );
  };

  return (
    <div className="mt-8 overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => onSort("username")}
              className="cursor-pointer px-6 py-3 text-left hover:bg-gray-200"
            >
              Username{" "}
              {sorting.sortBy === "username" &&
                (sorting.sortOrder === "asc"
                  ? "▲"
                  : "▼")}
            </th>
            <th
              onClick={() => onSort("username")}
              className="cursor-pointer px-6 py-3 text-left hover:bg-gray-200"
            >
              Command
            </th>
            <th
              onClick={() => onSort("username")}
              className="cursor-pointer px-6 py-3 text-left hover:bg-gray-200"
            >
              Status
            </th>
            <th
              onClick={() => onSort("username")}
              className="cursor-pointer px-6 py-3 text-left hover:bg-gray-200"
            >
              Created At
            </th>
          </tr>
        </thead>

        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.id} className="border-t transition-colors hover:bg-gray-50">
              <td className="px-6 py-4">{interaction.username}</td>
              <td className="px-6 py-4">{interaction.commandName}</td>
              <td className="px-6 py-4 text-center">
                <StatusBadge status={interaction.status} />
              </td>
              <td className="px-6 py-4">
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
