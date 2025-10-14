<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-if="showNavbar" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="flex">
      <Sidebar v-if="showSidebar" :open="sidebarOpen" />
      <main
        :class="[
          'w-full',
          showSidebar && sidebarOpen ? 'md:ml-64' : '',
          'transition-all duration-300',
        ]"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const route = useRoute();

const showNavbar = computed(() => route.name !== "Login");
const showSidebar = computed(() => route.name !== "Login");

// local control for the sidebar visibility. Default open on non-login routes.
const sidebarOpen = ref(showSidebar.value);

// keep sidebarOpen in sync when route changes (e.g., entering/exiting Login)
watch(showSidebar, (val) => {
  sidebarOpen.value = val;
});
</script>
