export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Session {
  user: User;
  tokens: Tokens;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
