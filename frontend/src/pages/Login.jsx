import { useState } from "react";

import { login } from "../services/authApi.js";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      onLoginSuccess(data.username);
    } catch (err) {
      const message =
      err.response?.data?.message || "Login failed. Check your credentials and try again.";

      setError(message);

      setUsername("");
      setPassword("");

      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="console-grid relative flex min-h-screen items-center justify-center overflow-hidden bg-console-bg px-4 font-sans text-console-text">
      <div
        className="pointer-events-none absolute h-105 w-105 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-console-accent)" }}
      />

      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-console-border bg-console-panel px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-console-danger/70" />
          <span className="h-3 w-3 rounded-full bg-console-warn/70" />
          <span className="h-3 w-3 rounded-full bg-console-accent/70" />
          <span className="ml-3 font-mono text-xs text-console-muted">
            bot-console — authentication required
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-b-lg border border-console-border bg-console-panel p-8 shadow-2xl shadow-black/40"
        >
          <p className="mb-1 font-mono text-sm text-console-accent">$ login --admin</p>
          <h1 className="mb-6 text-2xl font-semibold tracking-tight">Sign in to the dashboard</h1>

          {error && (
            <div className="mb-5 rounded-md border border-console-danger/30 bg-console-danger/10 px-3 py-2 font-mono text-sm text-console-danger">
              {error}
            </div>
          )}

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-console-muted">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-5 w-full rounded-md border border-console-border bg-console-bg px-3 py-2.5 font-mono text-sm text-console-text outline-none transition focus:border-console-accent focus:ring-1 focus:ring-console-accent"
            autoComplete="username"
            placeholder="admin"
            required
          />

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-console-muted">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-7 w-full rounded-md border border-console-border bg-console-bg px-3 py-2.5 font-mono text-sm text-console-text outline-none transition focus:border-console-accent focus:ring-1 focus:ring-console-accent"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-console-accent px-4 py-2.5 font-semibold text-console-bg transition hover:bg-console-accent/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Authenticating…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center font-mono text-xs text-console-muted">
          access is restricted to configured admin accounts
        </p>
      </div>
    </div>
  );
};

export default Login;
