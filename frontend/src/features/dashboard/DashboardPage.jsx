import { useMemo, useState } from "react";
import AdminUsers from "../admin/AdminUsers.jsx";
import "./DashboardPage.css";

const NAV_ITEMS = [
  { id: "health", label: "Health" },
  { id: "admin", label: "Admin" },
];

export default function DashboardPage({
  userName = "Usuario",
  accessToken = "",
  onLogout = () => {},
}) {
  const [active, setActive] = useState("health");

  const subtitle = useMemo(() => {
    if (active === "admin") {
      return "Gerencie acessos, perfis e usuarios com seguranca.";
    }
    return "Verifique o status da API e acompanhe sinais vitais.";
  }, [active]);

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <span>Painel</span>
          <strong>Workspace</strong>
        </div>

        <nav className="dashboard-nav" aria-label="Menu principal">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? "is-active" : ""}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="dashboard-user">
          <div>
            <span>Logado como</span>
            <strong>{userName}</strong>
          </div>
          <button type="button" className="dashboard-logout" onClick={onLogout}>
            Sair
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p>Bem-vindo de volta</p>
            <h1>Dashboard</h1>
            <span>{subtitle}</span>
          </div>
          <div className="dashboard-badge">
            <span>{active === "admin" ? "Controle admin" : "Status API"}</span>
          </div>
        </header>

        <section className="dashboard-content">
          {active === "admin" ? (
            <AdminUsers accessToken={accessToken} />
          ) : (
            <div className="dashboard-grid">
              <article className="dashboard-card">
                <h3>API Online</h3>
                <p>
                  Realize chamadas protegidas e valide a integridade do backend.
                </p>
                <button type="button">Abrir</button>
              </article>
              <article className="dashboard-card">
                <h3>Logs recentes</h3>
                <p>Monitore erros e eventos criticos em tempo real.</p>
                <button type="button">Explorar</button>
              </article>
              <article className="dashboard-card">
                <h3>Metricas</h3>
                <p>Visualize tempos de resposta e disponibilidade.</p>
                <button type="button">Detalhes</button>
              </article>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
