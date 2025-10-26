<template>
  <select
    v-model="currentLocale"
    @change="changeLocale"
    class="px-2 py-1 border rounded-md text-sm text-gray-700"
  >
    <option value="en" class="rubik-bold">English</option>
    <option value="kh" class="kantumruy-pro-bold">ខ្មែរ</option>
  </select>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentLocale = ref<string>(locale.value);

locale.value = currentLocale.value;

onMounted(() => {
  const saved = localStorage.getItem("locale");
  if (saved && ["en", "kh"].includes(saved)) {
    currentLocale.value = saved;
    locale.value = saved; // Update i18n global locale
  }
  // If no saved locale, `currentLocale` already matches i18n's default
});

const changeLocale = () => {
  locale.value = currentLocale.value;
  localStorage.setItem("locale", currentLocale.value);
};
</script>
