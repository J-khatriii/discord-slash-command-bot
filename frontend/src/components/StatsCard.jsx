const StatsCard = ({ title, value }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-sm font-medium text-gray-500">
        {title}
      </h2>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
