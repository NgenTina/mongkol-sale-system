// src/stores/auth.ts
import { defineStore } from "pinia";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem("token"),
  }),

  getters: {
    currentUser: (state): User | null => state.user,
    isLoggedIn: (state): boolean => state.isAuthenticated,
    userRole: (state): string | null => state.user?.role || null,
  },

  actions: {
    setAuth(user: User, token: string) {
      this.user = user;
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("token", token);
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem("token");
    },

    /**
     * Sign in against the backend. This tries several common response shapes:
     * - { access_token, user }
     * - { token, user }
     * - { token, ...userFields }
     * If your backend uses a different path or shape, adjust `apiBase` or the parsing below.
     */
    async signIn(email: string, password: string) {
      const apiBase = (import.meta as any).env.VITE_API_URL || "";

      // Try the common /auth/login route first
      const url = `${apiBase}/auth/login`;

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          // attempt to read json error message, fall back to statusText
          let errMsg = res.statusText;
          try {
            const errJson = await res.json();
            errMsg =
              errJson.detail || errJson.message || JSON.stringify(errJson);
          } catch (e) {
            // ignore
          }
          throw new Error(errMsg || "Login failed");
        }

        const data = await res.json();

        // Accept multiple token shapes
        const token =
          data.access_token || data.token || data?.data?.token || null;
        const user = data.user || (data.access_token ? data : data);

        if (!token) {
          // Maybe the backend returned the user directly and token is created client-side
          // or this is a simple mock - try to fallback to a token field or throw.
          throw new Error("No token returned from server");
        }

        this.setAuth(user as User, token);
        return user as User;
      } catch (err) {
        // Backend login failed or is not implemented; rethrow so caller can show an error
        throw err;
      }
    },

    /**
     * Initialize auth from localStorage. If a token exists, try to fetch the current user
     * from the backend (/auth/me or /users/me). If that fails, try to decode a mock token
     * that was created by the app (base64 JSON).
     */
    async initializeAuth() {
      const token = localStorage.getItem("token");
      if (!token) return;

      this.token = token;
      this.isAuthenticated = true;

      const apiBase = (import.meta as any).env.VITE_API_URL || "";
      const headers = { Authorization: `Bearer ${token}` };

      // Try common endpoints that some backends expose
      const tryEndpoints = [
        `${apiBase}/auth/me`,
        `${apiBase}/users/me`,
        `${apiBase}/me`,
      ];

      for (const endpoint of tryEndpoints) {
        if (!endpoint) continue;
        try {
          const res = await fetch(endpoint, { headers });
          if (res.ok) {
            const user = await res.json();
            this.user = user as User;
            return;
          }
        } catch (e) {
          // network/backend may not be available in this environment; continue to fallback
        }
      }

      // Fallback: try decoding token as base64-encoded user (used by the mock in Login.vue)
      try {
        const decoded = JSON.parse(atob(token));
        this.user = decoded as User;
      } catch (e) {
        // give up - user will be null but isAuthenticated remains true until token validated
      }
    },
  },
});
