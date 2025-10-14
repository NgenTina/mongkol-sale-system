<!-- src/views/Items.vue -->
<!-- src/views/Items.vue -->
<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-800">Items</h1>
      <button
        @click="openAddItemModal"
        class="px-5 py-2 rounded-lg bg-orange-600 text-white shadow hover:bg-orange-700"
      >
        ដាក់ទំនិញថ្មី
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-6">
      <div class="relative">
        <button
          @click="toggleProductMenu"
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-gray-800 shadow"
        >
          <span class="text-sm font-medium">Products</span>
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
              class="cursor-pointer text-sm font-semibold hover:text-orange-600"
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
          <span class="text-sm font-medium">Size</span>
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
            <th class="px-8 py-6">Products</th>
            <th class="px-8 py-6">Size</th>
            <th class="px-8 py-6">Stock</th>
            <th class="px-8 py-6">Price</th>
            <th class="px-8 py-6">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="border-t border-gray-200 hover:bg-gray-50"
          >
            <td class="px-8 py-4 font-semibold text-gray-800">
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
        <h3 class="text-lg font-bold mb-4">Add Item</h3>
        <form @submit.prevent="addMockItem">
          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="newItem.name"
              placeholder="Product name"
              class="border p-2 rounded"
            />
            <input
              v-model="newItem.size"
              placeholder="Size (e.g. 13cm)"
              class="border p-2 rounded"
            />
            <input
              v-model.number="newItem.stock"
              type="number"
              placeholder="Stock"
              class="border p-2 rounded"
            />
            <input
              v-model="newItem.price"
              placeholder="Price"
              class="border p-2 rounded"
            />
          </div>
          <div class="mt-4 flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-orange-600 text-white"
            >
              Save
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

onMounted(() => {
  // Mock data inspired by screenshot
  items.value = [
    { id: 1, name: "ឈើ", size: "13cm", stock: 200, price: "$10" },
    { id: 2, name: "ឈើប្រណិត", size: "13cm", stock: 200, price: "$12" },
    { id: 3, name: "រុក្ខជាតិ", size: "13cm", stock: 100, price: "$8" },
    { id: 4, name: "ក្រូមសុី", size: "13cm", stock: 100, price: "$9" },
    { id: 5, name: "សំបក", size: "18cm", stock: 100, price: "$11" },
    { id: 6, name: "រុក្ខជាតិ", size: "22cm", stock: 50, price: "$14" },
    { id: 7, name: "ផ្ទះ", size: "25cm", stock: 50, price: "$16" },
    { id: 8, name: "សំបក", size: "30cm", stock: 0, price: "$7" },
  ];

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
