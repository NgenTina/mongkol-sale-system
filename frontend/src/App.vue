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
import { computed, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const route = useRoute();
const { locale } = useI18n();

const showNavbar = computed(() => route.name !== "Login");
const showSidebar = computed(() => route.name !== "Login");
const sidebarOpen = ref(showSidebar.value);

// keep sidebarOpen in sync when route changes (e.g., entering/exiting Login)
watch(showSidebar, (val) => {
  sidebarOpen.value = val;
});

const updateHtmlLangAndClass = (lang: string) => {
  const html = document.documentElement;

  // Set language attribute (important for accessibility & SEO)
  html.setAttribute("lang", lang);

  // Remove old lang-xx classes
  html.className = html.className
    .split(" ")
    .filter(cls => !cls.startsWith("lang-"))
    .join(" ");

  // Add new language class
  html.classList.add(`lang-${lang}`);
};

onMounted(() => {
  updateHtmlLangAndClass(locale.value);
});

watch(locale, (newLocale) => {
  updateHtmlLangAndClass(newLocale);
});
</script>
