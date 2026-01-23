import { useEffect, useState } from "react";
import LoginPage from "../features/auth/LoginPage.jsx";
import RegisterPage from "../features/auth/RegisterPage.jsx";
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="app">
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
      {view === "login" ? (
        <LoginPage onSwitch={() => setView("register")} />
      ) : (
        <RegisterPage onSwitch={() => setView("login")} />
      )}
    </div>
  );
}
