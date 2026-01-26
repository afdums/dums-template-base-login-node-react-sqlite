declare global {
  interface Window {
    __APP_CONFIG__?: {
      apiUrl?: string;
    };
  }
}

export const API_URL =
  window.__APP_CONFIG__?.apiUrl?.trim() || "http://localhost:3000";
