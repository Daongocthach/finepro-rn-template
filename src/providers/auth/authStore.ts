import { useEffect } from 'react';
import { create } from 'zustand';
import {
  getSession as getMockSession,
  logout as logoutService,
  type MockAuthSession,
  type MockAuthUser,
} from '@/features/auth/services/authService';
import { getItem, removeItem, setItem, STORAGE_KEYS } from '@/utils/storage';

type AuthUser = MockAuthUser;
type AuthSession = MockAuthSession;

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  hydrateAuth: (payload: { user: AuthUser; session: AuthSession }) => void;
  clearSession: () => void;
  initialize: () => Promise<void>;
  cleanup: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setSession: (session) => set({ session, isAuthenticated: !!session }),

  setLoading: (isLoading) => set({ isLoading }),

  hydrateAuth: ({ user, session }) => {
    setItem(STORAGE_KEYS.auth.user, user);
    setItem(STORAGE_KEYS.auth.session, session);
    set({ user, session, isAuthenticated: true, isLoading: false });
  },

  clearSession: () => {
    removeItem(STORAGE_KEYS.auth.user);
    removeItem(STORAGE_KEYS.auth.session);
    void logoutService();
    set({ user: null, session: null, isAuthenticated: false });
  },

  initialize: async () => {
    const storedUser = getItem<AuthUser>(STORAGE_KEYS.auth.user);
    const storedSession = getItem<AuthSession>(STORAGE_KEYS.auth.session);

    if (storedUser.success && storedSession.success && storedUser.data && storedSession.data) {
      set({
        user: storedUser.data,
        session: storedSession.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return;
    }

    const { session } = await getMockSession();
    set({ session, isAuthenticated: !!session, isLoading: false });
  },

  cleanup: () => {},
}));

export function useAuthInit() {
  const initialize = useAuthStore((s) => s.initialize);
  const cleanup = useAuthStore((s) => s.cleanup);

  useEffect(() => {
    initialize();
    return () => cleanup();
  }, [initialize, cleanup]);
}
