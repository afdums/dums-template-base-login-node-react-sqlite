import { useEffect, useMemo, useRef, useState } from "react";
import { register } from "./authService";
import { isEmail } from "../../shared/lib/validators";
import "./LoginPage.css";

const MIN_PASSWORD_LENGTH = 6;

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage({ onSwitch = () => {} }) {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const redirectTimeoutRef = useRef(null);

  const isValid = useMemo(() => {
    return (
      values.name.trim().length >= 2 &&
      isEmail(values.email) &&
      values.password.length >= MIN_PASSWORD_LENGTH &&
      values.password === values.confirmPassword
    );
  }, [values]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }

    if (!isValid) {
      if (values.password !== values.confirmPassword) {
        setError("As senhas nao conferem.");
      } else {
        setError("Preencha nome, email valido e senha com minimo 6 caracteres.");
      }
      return;
    }

    setIsLoading(true);

    try {
      const data = await register(values);
      const userName = data?.user?.name || "Usuario";
      setSuccess(`Usuario criado. Bem-vindo, ${userName}. Redirecionando...`);
      setValues(initialValues);
      redirectTimeoutRef.current = setTimeout(() => {
        onSwitch();
      }, 1500);
    } catch (err) {
      setError(err.message || "Nao foi possivel cadastrar.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="auth-shell">
      <div className="auth-hero">
        <span className="auth-chip">Novo acesso</span>
        <h1>Crie sua conta</h1>
        <p>
          Cadastre seus dados para liberar o acesso e testar o fluxo do backend
          com tokens JWT.
        </p>
        <div className="auth-metrics">
          <div>
            <strong>Cadastro rapido</strong>
            <span>Nome, email e senha</span>
          </div>
          <div>
            <strong>Pronto para testar</strong>
            <span>Health check protegido</span>
          </div>
        </div>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <span className="auth-eyebrow">Bem-vindo</span>
          <h2>Criar conta</h2>
          <p>Informe seus dados para continuar.</p>
        </div>

        <div className="auth-field">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            value={values.name}
            onChange={handleChange}
            required
          />
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
            autoComplete="new-password"
            placeholder="Minimo 6 caracteres"
            value={values.password}
            onChange={handleChange}
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repita a senha"
            value={values.confirmPassword}
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
          {isLoading ? "Criando conta..." : "Criar conta"}
        </button>

        <p className="auth-hint">
          Depois do cadastro, use o login para testar <span>/health</span>.
        </p>

        <p className="auth-switch">
          Ja tem conta?
          <button type="button" onClick={onSwitch}>
            Entrar
          </button>
        </p>
      </form>
    </section>
  );
}
