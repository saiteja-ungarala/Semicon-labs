import { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { apiConfigured } from '@/lib/api';

const baseURL = (import.meta.env.VITE_API_URL as string) || '';

/**
 * On first load, the access token is gone (memory-only), but the httpOnly
 * refresh cookie may still be valid. Try one silent refresh to restore the
 * session; mark the user as a guest if it fails.
 */
export function useSessionBootstrap() {
  const status = useAuthStore((s) => s.status);

  useEffect(() => {
    if (status !== 'idle') return;
    // Static build with no API: settle straight to guest instead of firing a
    // request on every page load that can only fail.
    if (!apiConfigured) {
      useAuthStore.getState().clear();
      return;
    }
    useAuthStore.getState().setStatus('loading');
    axios
      .post<{ user: import('@/stores/auth').AuthUser; accessToken: string }>(
        `${baseURL}/v1/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then(({ data }) => useAuthStore.getState().setAuth(data.user, data.accessToken))
      .catch(() => useAuthStore.getState().clear());
  }, [status]);

  return status;
}
