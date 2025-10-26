<!-- src/components/Sidebar.vue -->
<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 w-64 bg-[#FEDF92] shadow-lg transform transition-transform duration-300 ease-in-out z-30',
      open ? 'translate-x-0' : '-translate-x-full',
      'h-screen overflow-y-auto',
    ]"
    aria-hidden="false"
  >
    <!-- Top header with rounded right edge, centered emblem and welcome text -->
    <div class="px-6 pt-6 pb-8">
      <div
        class="bg-[#FFF3D6] rounded-tr-3xl rounded-br-3xl p-6 flex flex-col items-center shadow-sm"
      >
        <div
          class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4"
        >
          <!-- small emblem placeholder (replace with real logo if available) -->
          <img src="/mongkol-logo.svg" alt="Mongkol" class="w-12 h-12" />
        </div>
        <p class="text-center text-sm md:text-base font-medium text-gray-800">
          {{ $t("components.sidebar.welcomeMessage") }}
        </p>
      </div>
    </div>

    <nav class="mt-6">
      <div class="px-4 space-y-2">
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-orange-50 text-orange-900"
        >
          <svg
            class="mr-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {{ $t("components.sidebar.sidebarNavigation.home") }}
        </router-link>

        <router-link
          :to="{ name: 'Items' }"
          class="flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-orange-50 text-orange-900"
        >
          <svg
            class="mr-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          {{ $t("components.sidebar.sidebarNavigation.items") }}
        </router-link>

        <router-link
          :to="{ name: 'Customers' }"
          class="flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-orange-50 text-orange-900"
        >
          <svg
            class="mr-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {{ $t("components.sidebar.sidebarNavigation.customers") }}
        </router-link>

        <router-link
          :to="{ name: 'Orders' }"
          class="flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-orange-50 text-orange-900"
        >
          <svg
            class="mr-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {{ $t("components.sidebar.sidebarNavigation.orders") }}
        </router-link>

        <router-link
          :to="{ name: 'Contacts' }"
          class="flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-orange-50 text-orange-900"
        >
          <svg
            class="mr-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {{ $t("components.sidebar.sidebarNavigation.contacts") }}
        </router-link>

        <router-link
          :to="{ name: 'Profile' }"
          class="flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-orange-50 text-orange-900"
        >
          <svg
            class="mr-3 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {{ $t("components.sidebar.sidebarNavigation.profile") }}
        </router-link>
      </div>
    </nav>

    <div class="absolute bottom-0 w-full p-4 border-t border-gray-200">
      <button
        @click="logout"
        class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
      >
        <svg
          class="mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        {{ $t("components.navbar.logOutButton") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { defineProps, computed } from "vue";

const props = defineProps<{ open?: boolean }>();
const open = computed(() => props.open ?? true);

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
