// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/items",
    name: "Items",
    component: () => import("@/views/Items.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/customers",
    name: "Customers",
    component: () => import("@/views/Customers.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () => import("@/views/Contacts.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(
    (record: any) => record.meta.requiresAuth
  );

  if (requiresAuth && !authStore.isLoggedIn) {
    next("/login");
  } else if (!requiresAuth && authStore.isLoggedIn && to.name === "Login") {
    next("/");
  } else {
    next();
  }
});

export default router;
