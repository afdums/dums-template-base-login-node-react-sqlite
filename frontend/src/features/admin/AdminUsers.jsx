import { useEffect, useMemo, useState } from "react";
import { listUsers, setUserActive } from "./adminService";
import "./AdminUsers.css";

export default function AdminUsers({ accessToken = "" }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const canLoad = useMemo(() => Boolean(accessToken), [accessToken]);

  const loadUsers = async () => {
    if (!canLoad) {
      setError("Token nao encontrado. Faca login novamente.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await listUsers(accessToken);
      setUsers(data);
    } catch (err) {
      setError(err.message || "Nao foi possivel carregar usuarios.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [accessToken]);

  const handleToggle = async (user) => {
    if (!user) return;
    setUpdatingId(user.id);
    setError("");

    try {
      const updated = await setUserActive(accessToken, user.id, !user.isActive);
      setUsers((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (err) {
      setError(err.message || "Nao foi possivel atualizar o usuario.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-users">
      <div className="admin-users__header">
        <div>
          <h2>Usuarios</h2>
          <p>Ative ou desative acessos conforme necessario.</p>
        </div>
        <button type="button" onClick={loadUsers} disabled={isLoading}>
          {isLoading ? "Atualizando..." : "Atualizar lista"}
        </button>
      </div>

      {error ? (
        <div className="admin-users__alert" role="alert">
          {error}
        </div>
      ) : null}

      <div className="admin-users__table">
        <div className="admin-users__row admin-users__row--head">
          <span>Usuario</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Acoes</span>
        </div>

        {users.length === 0 && !isLoading ? (
          <div className="admin-users__empty">
            Nenhum usuario encontrado.
          </div>
        ) : null}

        {users.map((user) => (
          <div key={user.id} className="admin-users__row">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span className="admin-users__pill">{user.role}</span>
            <span className={user.isActive ? "is-active" : "is-inactive"}>
              {user.isActive ? "Ativo" : "Inativo"}
            </span>
            <button
              type="button"
              className={user.isActive ? "btn-danger" : "btn-success"}
              onClick={() => handleToggle(user)}
              disabled={updatingId === user.id}
            >
              {updatingId === user.id
                ? "Salvando..."
                : user.isActive
                ? "Desativar"
                : "Ativar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
