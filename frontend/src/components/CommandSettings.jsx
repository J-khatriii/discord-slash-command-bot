import { useEffect, useState } from "react";
import {
  getCommandConfig,
  updateCommandConfig,
} from "../services/configApi";

const CommandSettings = () => {
  const [config, setConfig] = useState({
    report: true,
    status: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await getCommandConfig();
      setConfig(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load command configuration");
    } finally {
      setLoading(false);
    }
  };

  const toggleCommand = async (command) => {
    const enabled = !config[command];

    try {
      await updateCommandConfig(command, enabled);

      setConfig((prev) => ({
        ...prev,
        [command]: enabled,
      }));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update configuration");
    }
  };

  if (loading) {
    return (
      <div className="mt-8 rounded-lg border border-console-border bg-console-panel p-6">
        <p className="font-mono text-sm text-console-muted">loading configuration…</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-lg border border-console-border bg-console-panel p-6">
        <div className="mb-4 border-b border-console-border pb-3">
          <p className="font-mono text-xs uppercase tracking-widest text-console-muted">
            ⚙ command configuration
          </p>
          <h2 className="mt-2 font-mono text-lg font-semibold text-console-text">
            Manage Command Availability
          </h2>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-console-danger/30 bg-console-danger/10 px-3 py-2 font-mono text-sm text-console-danger">
            ✕ {error}
          </div>
        )}

        <div className="space-y-3">
          {/* Report Command */}
          <div className="flex items-center justify-between rounded-md border border-console-border bg-console-bg px-4 py-3 transition hover:border-console-accent/50">
            <div>
              <p className="font-mono text-sm font-semibold text-console-text">
                /report
              </p>
              <p className="font-mono text-xs text-console-muted">
                submit a report
              </p>
            </div>

            <button
              onClick={() => toggleCommand("report")}
              className={`ml-4 rounded-md px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition ${
                config.report
                  ? "border border-console-success bg-console-success/10 text-console-success hover:bg-console-success/20"
                  : "border border-console-danger bg-console-danger/10 text-console-danger hover:bg-console-danger/20"
              }`}
            >
              {config.report ? "enabled" : "disabled"}
            </button>
          </div>

          {/* Status Command */}
          <div className="flex items-center justify-between rounded-md border border-console-border bg-console-bg px-4 py-3 transition hover:border-console-accent/50">
            <div>
              <p className="font-mono text-sm font-semibold text-console-text">
                /status
              </p>
              <p className="font-mono text-xs text-console-muted">
                check bot status
              </p>
            </div>

            <button
              onClick={() => toggleCommand("status")}
              className={`ml-4 rounded-md px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition ${
                config.status
                  ? "border border-console-success bg-console-success/10 text-console-success hover:bg-console-success/20"
                  : "border border-console-danger bg-console-danger/10 text-console-danger hover:bg-console-danger/20"
              }`}
            >
              {config.status ? "enabled" : "disabled"}
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-console-border pt-3">
          <p className="font-mono text-xs text-console-muted">
            ℹ disabled commands will respond with an admin message
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommandSettings;
