<!-- src/views/Items.vue -->
<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-800">
        {{ $t("pages.itemsPage.title") }}
      </h1>
      <button
        @click="openAddItemModal"
        class="px-5 py-2 rounded-lg bg-orange-600 text-white shadow hover:bg-orange-700 kantumruy-pro-regular"
      >
        {{ $t("pages.itemsPage.addItemButton") }}
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-6">
      <div class="relative">
        <button
          @click="toggleProductMenu"
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-gray-800 shadow"
        >
          <span class="text-sm font-medium">  
            {{$t("pages.itemsPage.filterByProduct")}}
          </span>
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          v-if="showProductMenu"
          class="absolute left-0 mt-2 w-56 bg-yellow-50 rounded-2xl p-3 shadow-lg z-30"
        >
          <div class="text-xs text-gray-500 mb-2">All</div>
          <ul class="space-y-2 max-h-48 overflow-auto">
            <li
              v-for="p in uniqueProducts"
              :key="p"
              @click="selectProduct(p)"
              class="cursor-pointer text-sm font-semibold hover:text-orange-600 kantumruy-pro-regular"
            >
              {{ p }}
            </li>
          </ul>
        </div>
      </div>

      <div class="relative">
        <button
          @click="toggleSizeMenu"
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-gray-800 shadow"
        >
          <span class="text-sm font-medium">
            {{ $t("pages.itemsPage.filterBySize") }}
          </span>
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          v-if="showSizeMenu"
          class="absolute left-0 mt-2 w-36 bg-yellow-50 rounded-2xl p-3 shadow-lg z-30"
        >
          <div class="text-xs text-gray-500 mb-2">All</div>
          <ul class="space-y-2">
            <li
              v-for="s in uniqueSizes"
              :key="s"
              @click="selectSize(s)"
              class="cursor-pointer text-sm font-semibold hover:text-orange-600"
            >
              {{ s }}
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-1"></div>
    </div>

    <!-- Table container -->
    <div
      class="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
    >
      <table class="min-w-full">
        <thead class="bg-transparent">
          <tr class="text-left text-sm text-gray-600">
            <th class="px-8 py-6">
              {{ $t("pages.itemsPage.table.header.product") }}
            </th>
            <th class="px-8 py-6">
              {{ $t("pages.itemsPage.table.header.size") }}
            </th>
            <th class="px-8 py-6">
              {{ $t("pages.itemsPage.table.header.stock") }}
            </th>
            <th class="px-8 py-6">
              {{ $t("pages.itemsPage.table.header.price") }}
            </th>
            <th class="px-8 py-6">
              {{ $t("pages.itemsPage.table.header.status") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="border-t border-gray-200 hover:bg-gray-50"
          >
            <td
              class="px-8 py-4 font-semibold text-gray-800 kantumruy-pro-regular"
            >
              {{ item.name }}
            </td>
            <td class="px-8 py-4 text-gray-700">{{ item.size }}</td>
            <td class="px-8 py-4 text-gray-700">{{ item.stock }} boxes</td>
            <td class="px-8 py-4 text-gray-700">{{ item.price }}</td>
            <td class="px-8 py-4">
              <span
                :class="{
                  'text-green-600': item.stock > 50,
                  'text-amber-500': item.stock > 0 && item.stock <= 50,
                  'text-red-600': item.stock === 0,
                }"
                class="font-medium"
              >
                {{ statusText(item.stock) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Simple Add Modal (kept minimal) -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-lg p-6">
        <h3 class="text-lg font-bold mb-4">
          {{ $t("pages.itemsPage.addItemButton") }}
        </h3>
        <form @submit.prevent="addMockItem">
          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="newItem.name"
              :placeholder="$t('pages.itemsPage.addItemModal.name')"
              class="border p-2 rounded"
            />
            <input
              v-model="newItem.size"
              :placeholder="$t('pages.itemsPage.addItemModal.size')"
              class="border p-2 rounded"
            />
            <input
              v-model.number="newItem.stock"
              type="number"
              :placeholder="$t('pages.itemsPage.addItemModal.stock')"
              class="border p-2 rounded"
            />
            <input
              v-model="newItem.price"
              :placeholder="$t('pages.itemsPage.addItemModal.price')"
              class="border p-2 rounded"
            />
          </div>
          <div class="mt-4 flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded bg-gray-200"
            >
              {{ $t("pages.itemsPage.addItemModal.cancelButton") }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-orange-600 text-white"
            >
              {{ $t("pages.itemsPage.addItemModal.saveButton") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDataStore } from "@/stores/data";

const dataStore = useDataStore();

const showModal = ref(false);
const showProductMenu = ref(false);
const showSizeMenu = ref(false);
const selectedProduct = ref("All");
const selectedSize = ref("All");

const newItem = ref({ name: "", size: "13cm", stock: 0, price: "" });
const items = ref<Array<any>>([]);
const storeItems = computed(() => dataStore.allItems);

onMounted(() => {
  // Prefer items already present in the data store (populated from staticData in DEV),
  // otherwise use local mock and mirror into the store so other pages can access it.
  if (storeItems.value && storeItems.value.length > 0) {
    items.value = storeItems.value as any[];
  } else {
    // local mock (kept similar to previous mock)
    items.value = [
      { id: 1, name: "ผ้าพันคอ", size: "13cm", stock: 200, price: "$10" },
      { id: 2, name: "เสื้อผ้า", size: "13cm", stock: 200, price: "$12" },
      { id: 3, name: "ตะกร้า", size: "13cm", stock: 100, price: "$8" },
      { id: 4, name: "หมอน", size: "13cm", stock: 100, price: "$9" },
      { id: 5, name: "ของขวัญ", size: "18cm", stock: 100, price: "$11" },
      { id: 6, name: "ของตกแต่ง", size: "22cm", stock: 50, price: "$14" },
      { id: 7, name: "ของเล่น", size: "25cm", stock: 50, price: "$16" },
      { id: 8, name: "แก้วน้ำ", size: "30cm", stock: 0, price: "$7" },
    ];

    if (typeof dataStore.setItems === "function") {
      dataStore.setItems(items.value as any[]);
    }
  }

  // Mirror into data store so other parts of app can access
  if (typeof dataStore.setItems === "function") {
    dataStore.setItems(items.value);
  }
});

const uniqueProducts = computed(() =>
  Array.from(new Set(items.value.map((i) => i.name)))
);
const uniqueSizes = computed(() =>
  Array.from(new Set(items.value.map((i) => i.size)))
);

const toggleProductMenu = () => {
  showProductMenu.value = !showProductMenu.value;
  showSizeMenu.value = false;
};
const toggleSizeMenu = () => {
  showSizeMenu.value = !showSizeMenu.value;
  showProductMenu.value = false;
};
const selectProduct = (p: string) => {
  selectedProduct.value = p;
  showProductMenu.value = false;
};
const selectSize = (s: string) => {
  selectedSize.value = s;
  showSizeMenu.value = false;
};

const filteredItems = computed(() => {
  return items.value.filter((i) => {
    const byProduct =
      selectedProduct.value === "All" || i.name === selectedProduct.value;
    const bySize =
      selectedSize.value === "All" || i.size === selectedSize.value;
    return byProduct && bySize;
  });
});

const statusText = (stock: number) => {
  if (stock === 0) return "Out of Stock";
  return "Available";
};

const openAddItemModal = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  newItem.value = { name: "", size: "13cm", stock: 0, price: "" };
};

const addMockItem = () => {
  const id = Math.max(0, ...items.value.map((i) => i.id)) + 1;
  items.value.push({
    id,
    name: newItem.value.name || "ឈុតថ្មី",
    size: newItem.value.size,
    stock: newItem.value.stock,
    price: newItem.value.price || "$0",
  });
  if (typeof dataStore.setItems === "function") dataStore.setItems(items.value);
  closeModal();
};
</script>
