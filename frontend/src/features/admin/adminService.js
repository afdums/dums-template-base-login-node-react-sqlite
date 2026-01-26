const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const parseResponse = async (response) => {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.error || "Nao foi possivel concluir a operacao.";
    throw new Error(message);
  }

  return payload;
};

export const listUsers = async (accessToken) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = await parseResponse(response);
  return payload?.users || [];
};

export const setUserActive = async (accessToken, userId, isActive) => {
  const response = await fetch(`${API_URL}/admin/users/${userId}/active`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive }),
  });

  const payload = await parseResponse(response);
  return payload?.user;
};
