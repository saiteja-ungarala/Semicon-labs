import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: 'USER' | 'INSTRUCTOR' | 'ADMIN' | 'SUPERADMIN';
  avatarUrl: string | null;
  emailVerified: boolean;
}

type Status = 'idle' | 'loading' | 'authenticated' | 'guest';

interface AuthState {
  user: AuthUser | null;
  /** Access token kept in memory only (never persisted) — refresh cookie restores sessions. */
  accessToken: string | null;
  status: Status;
  setAuth: (user: AuthUser, accessToken: string) => void;
  setUser: (user: AuthUser) => void;
  setToken: (accessToken: string | null) => void;
  setStatus: (status: Status) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  status: 'idle',
  setAuth: (user, accessToken) => set({ user, accessToken, status: 'authenticated' }),
  setUser: (user) => set({ user }),
  setToken: (accessToken) => set({ accessToken }),
  setStatus: (status) => set({ status }),
  clear: () => set({ user: null, accessToken: null, status: 'guest' }),
}));

/** Non-hook accessors for use inside the axios client. */
export const authStore = {
  get: () => useAuthStore.getState(),
};
