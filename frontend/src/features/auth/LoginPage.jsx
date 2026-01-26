import { useMemo, useState } from "react";
import { login } from "./authService";
import { isEmail } from "../../shared/lib/validators";
import "./LoginPage.css";

const MIN_PASSWORD_LENGTH = 6;

const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage({ onSwitch = () => {}, onLogin = () => {} }) {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValid = useMemo(() => {
    return (
      isEmail(values.email) && values.password.length >= MIN_PASSWORD_LENGTH
    );
  }, [values.email, values.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!isValid) {
      setError("Informe um email e senha validos.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await login(values);
      const userName = data?.user?.name || "Usuario";
      setSuccess(`Bem-vindo de volta, ${userName}.`);
      onLogin(data);
    } catch (err) {
      setError(err.message || "Nao foi possivel entrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-hero">
        <span className="auth-chip">Acesso seguro</span>
        <h1>Acesse seu workspace</h1>
        <p>
          Use suas credenciais para acessar o painel e validar o fluxo do
          backend em segundos.
        </p>
        <div className="auth-metrics">
          <div>
            <strong>JWT pronto</strong>
            <span>Tokens de acesso + refresh</span>
          </div>
          <div>
            <strong>Saude da API</strong>
            <span>Health check protegido</span>
          </div>
        </div>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <span className="auth-eyebrow">Bem-vindo</span>
          <h2>Entrar</h2>
          <p>Informe seu email e senha para continuar.</p>
        </div>

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Minimo 6 caracteres"
            value={values.password}
            onChange={handleChange}
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
        </div>

        {error ? (
          <div className="auth-alert" role="alert">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="auth-success" role="status" aria-live="polite">
            {success}
          </div>
        ) : null}

        <button className="auth-button" type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        <p className="auth-hint">
          Use o access token para chamar <span>/health</span>.
        </p>

        <p className="auth-switch">
          Ainda nao tem conta?
          <button type="button" onClick={onSwitch}>
            Criar conta
          </button>
        </p>
      </form>
    </section>
  );
}
