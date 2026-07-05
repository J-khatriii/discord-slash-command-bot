import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";

const App = () => {
  const [username, setUsername] = useState(() => localStorage.getItem("username"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  if (!username) {
    return <Login onLoginSuccess={setUsername} />;
  }

  return <Dashboard username={username} onLogout={handleLogout} />;
};

export default App;
