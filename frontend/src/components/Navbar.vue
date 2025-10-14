<!-- src/components/Navbar.vue -->
<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button
            @click="toggleSidebar"
            class="mr-4 p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-orange-600">
              Mongkol Sale System
            </h1>
          </div>
        </div>
        <div class="flex items-center">
          <div class="ml-3 relative">
            <div class="flex items-center space-x-4">
              <span class="text-sm font-medium text-gray-700">
                {{ user?.name }}
              </span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ user?.role }}
              </span>
              <button
                @click="logout"
                class="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  (e: "toggle-sidebar"): void;
}>();

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);

const toggleSidebar = () => {
  // emit event so parent can toggle the sidebar
  emit("toggle-sidebar");
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
