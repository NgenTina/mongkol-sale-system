<!-- src/components/DashboardCards.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-orange-100 text-orange-600">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-500">Total Orders Today</h3>
          <p class="text-3xl font-bold text-gray-900">{{ totalOrders }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-orange-100 text-orange-600">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-500">Total Customers</h3>
          <p class="text-3xl font-bold text-gray-900">{{ totalCustomers }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-orange-100 text-orange-600">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-500">Total Items</h3>
          <p class="text-3xl font-bold text-gray-900">{{ totalItems }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  totalOrders: {
    type: Number,
    required: true
  },
  totalCustomers: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  }
});
</script>