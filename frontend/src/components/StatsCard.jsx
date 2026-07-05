const StatsCard = ({ title, value }) => {
  return (
    <div className="group rounded-lg border border-console-border bg-console-panel p-5 transition hover:border-console-accent/50 hover:bg-console-panel-hover">
      <h2 className="font-mono text-xs uppercase tracking-widest text-console-muted">
        {title}
      </h2>

      <p className="mt-3 font-mono text-4xl font-semibold text-console-text transition group-hover:text-console-accent">
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
