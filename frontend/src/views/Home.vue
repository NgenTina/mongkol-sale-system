<!-- src/views/Home.vue -->
<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p class="text-gray-600">Welcome back, {{ user?.name }}!</p>
    </div>

    <!-- Dashboard Cards -->
    <DashboardCards
      :total-orders="dashboardData.totalOrders"
      :total-customers="dashboardData.totalCustomers"
      :total-items="dashboardData.totalItems"
    />

    <!-- Top 5 Orders Chart -->
    <div class="bg-white p-6 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Top 5 Orders</h2>
      <div class="flex items-end h-64 gap-4">
        <div
          v-for="item in dashboardData.topOrders"
          :key="item.id"
          class="flex flex-col items-center flex-1"
        >
          <div
            class="w-full bg-orange-500 rounded-t flex items-end justify-center transition-all duration-500"
            :style="{ height: `${item.quantity * 40}px` }"
          >
            <span class="text-white text-xs font-bold mb-1">{{
              item.quantity
            }}</span>
          </div>
          <div class="mt-2 text-sm text-gray-600">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Access Buttons -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <router-link
          to="/items"
          class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div class="p-3 rounded-full bg-orange-100 text-orange-600 mb-2">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <span class="text-sm font-medium">Items</span>
        </router-link>

        <router-link
          to="/customers"
          class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div class="p-3 rounded-full bg-orange-100 text-orange-600 mb-2">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span class="text-sm font-medium">Customers</span>
        </router-link>

        <router-link
          to="/orders"
          class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div class="p-3 rounded-full bg-orange-100 text-orange-600 mb-2">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <span class="text-sm font-medium">Orders</span>
        </router-link>

        <router-link
          to="/contacts"
          class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div class="p-3 rounded-full bg-orange-100 text-orange-600 mb-2">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <span class="text-sm font-medium">Contacts</span>
        </router-link>

        <router-link
          to="/profile"
          class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div class="p-3 rounded-full bg-orange-100 text-orange-600 mb-2">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span class="text-sm font-medium">Profile</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import DashboardCards from "@/components/DashboardCards.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);

const dashboardData = ref({
  totalOrders: 0,
  totalCustomers: 0,
  totalItems: 0,
  topOrders: [
    { id: 1, name: "Item 5", quantity: 5 },
    { id: 2, name: "Item 4", quantity: 4 },
    { id: 3, name: "Item 3", quantity: 3 },
    { id: 4, name: "Item 2", quantity: 2 },
    { id: 5, name: "Item 1", quantity: 1 },
  ],
});

onMounted(async () => {
  // In a real app, you would fetch this data from your API
  // For this example, we'll use mock data
  dashboardData.value = {
    totalOrders: 10,
    totalCustomers: 50,
    totalItems: 25,
    topOrders: [
      { id: 1, name: "Electronics", quantity: 12 },
      { id: 2, name: "Clothing", quantity: 8 },
      { id: 3, name: "Books", quantity: 6 },
      { id: 4, name: "Home & Garden", quantity: 5 },
      { id: 5, name: "Toys", quantity: 4 },
    ],
  };
});
</script>
