import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';

const baseURL = (import.meta.env.VITE_API_URL as string) || '/api';

/** Shared axios instance. Sends cookies (refresh token) and bearer access token. */
export const api = axios.create({
  baseURL: `${baseURL}/v1`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the in-memory access token to every request.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Transparent refresh on 401 -------------------------------------------
// A single in-flight refresh is shared by all queued requests to avoid a
// stampede; on failure the session is cleared.
let refreshing: Promise<string | null> | null = null;

async function runRefresh(): Promise<string | null> {
  try {
    const { data } = await axios.post<{ user: unknown; accessToken: string }>(
      `${baseURL}/v1/auth/refresh`,
      {},
      { withCredentials: true },
    );
    useAuthStore.getState().setToken(data.accessToken);
    return data.accessToken;
  } catch {
    useAuthStore.getState().clear();
    return null;
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (AxiosRequestConfig & { _retried?: boolean }) | undefined;
    const status = error.response?.status;
    const url = original?.url ?? '';

    // Don't try to refresh for the auth endpoints themselves.
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/register');

    if (status === 401 && original && !original._retried && !isAuthRoute) {
      original._retried = true;
      refreshing = refreshing ?? runRefresh();
      const token = await refreshing;
      refreshing = null;
      if (token) {
        original.headers = { ...original.headers, Authorization: `Bearer ${token}` };
        return api(original);
      }
    }
    return Promise.reject(error);
  },
);

/** Normalize an axios error into a human-readable message. */
export function apiErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { error?: { message?: string } } | undefined;
    return data?.error?.message ?? err.message ?? fallback;
  }
  return fallback;
}
