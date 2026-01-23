const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const login = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.error || "Nao foi possivel entrar.";
    throw new Error(message);
  }

  return payload;
};
