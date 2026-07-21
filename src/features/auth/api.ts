import { api } from '@/lib/api';
import type { AuthUser } from '@/stores/auth';

interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export async function registerRequest(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  const { data } = await api.post<AuthResponse>('/auth/register', input);
  return data;
}

export async function loginRequest(input: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>('/auth/login', input);
  return data;
}

export async function googleLoginRequest(idToken: string) {
  const { data } = await api.post<AuthResponse>('/auth/google', { idToken });
  return data;
}

export async function logoutRequest() {
  await api.post('/auth/logout');
}

export async function meRequest() {
  const { data } = await api.get<{ user: AuthUser }>('/auth/me');
  return data.user;
}

export async function forgotPasswordRequest(email: string) {
  await api.post('/auth/forgot-password', { email });
}

export async function resetPasswordRequest(token: string, password: string) {
  await api.post('/auth/reset-password', { token, password });
}

export async function verifyEmailRequest(token: string) {
  await api.post('/auth/verify-email', { token });
}
