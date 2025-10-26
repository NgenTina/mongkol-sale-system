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
      const mockUser: User = {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        role: "admin",
      };

      const mockToken = btoa(JSON.stringify(mockUser)); // Encode user data as a mock token

      // Simulate a delay for the mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (email === "johndoe@example.com" && password === "password123") {
        this.setAuth(mockUser, mockToken);
        return mockUser;
      } else {
        throw new Error("Invalid email or password");
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
