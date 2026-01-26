import { useEffect, useMemo, useState } from "react";
import LoginPage from "../features/auth/LoginPage.jsx";
import RegisterPage from "../features/auth/RegisterPage.jsx";
import DashboardPage from "../features/dashboard/DashboardPage.jsx";
import "./App.css";

const THEME_KEY = "theme";
const DEFAULT_THEME = "dark";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return DEFAULT_THEME;
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [view, setView] = useState("login");
  const [session, setSession] = useState(null);

  const userName = useMemo(() => session?.user?.name || "Usuario", [session]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const handleLogin = (data) => {
    setSession(data);
    setView("dashboard");
  };

  const handleLogout = () => {
    setSession(null);
    setView("login");
  };

  return (
    <div className={`app ${view === "dashboard" ? "app--dashboard" : ""}`}>
      <div className="theme-toggle" role="group" aria-label="Tema">
        <button
          type="button"
          className={theme === "dark" ? "is-active" : ""}
          aria-pressed={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Escuro
        </button>
        <button
          type="button"
          className={theme === "light" ? "is-active" : ""}
          aria-pressed={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Claro
        </button>
      </div>
      {view === "dashboard" ? (
        <DashboardPage
          userName={userName}
          accessToken={session?.tokens?.accessToken || ""}
          onLogout={handleLogout}
        />
      ) : view === "login" ? (
        <LoginPage onSwitch={() => setView("register")} onLogin={handleLogin} />
      ) : (
        <RegisterPage onSwitch={() => setView("login")} />
      )}
    </div>
  );
}
