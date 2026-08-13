import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';

/**
 * Where the remaining server-backed features point.
 *
 * The catalog is static (see src/data/catalog.ts), but sign-up, log-in,
 * checkout and the dashboard genuinely need a server. Every screen and button
 * for them is still here and fully built — they just have no API behind them
 * until one is configured.
 *
 * To connect yours: set VITE_API_URL to its base (e.g. https://api.example.com)
 * and the app resumes calling it. The endpoints it expects are documented in
 * HANDOVER.md; the request/response shapes are the typed interfaces in each
 * features/<area>/api.ts.
 */
const baseURL = (import.meta.env.VITE_API_URL as string) || '';

/** True when no API is configured — the default for the static build. */
export const apiConfigured = baseURL !== '';

const NOT_CONNECTED =
  'This action needs an API, which is not connected in this build. Set VITE_API_URL to your backend to enable it.';

/** Shared axios instance. Sends cookies (refresh token) and bearer access token. */
export const api = axios.create({
  baseURL: `${baseURL}/v1`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

/** Raised instead of firing a request when no API base URL is configured. */
export class ApiNotConnectedError extends Error {
  constructor() {
    super(NOT_CONNECTED);
    this.name = 'ApiNotConnectedError';
  }
}

// Attach the in-memory access token to every request.
api.interceptors.request.use((config) => {
  // Fail fast and legibly rather than firing at a relative /api that no static
  // host serves — that would surface as an HTML parse error or a bare 404.
  if (!apiConfigured) throw new ApiNotConnectedError();

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
  if (!apiConfigured) return null;
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
  if (err instanceof ApiNotConnectedError) return err.message;
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { error?: { message?: string } } | undefined;
    return data?.error?.message ?? err.message ?? fallback;
  }
  return fallback;
}
