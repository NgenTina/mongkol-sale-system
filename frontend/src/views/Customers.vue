<!-- src/views/Customers.vue -->
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Customers</h1>
      <button
        @click="openAddCustomerModal"
        class="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
      >
        <svg
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Customer
      </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(customer, index) in customers" :key="customer.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ index + 1 }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ customer.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ customer.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ customer.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ customer.address }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editCustomer(customer)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteCustomer(customer.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingCustomer ? "Edit Customer" : "Add New Customer" }}
          </h3>
        </div>
        <form @submit.prevent="saveCustomer" class="px-6 py-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              v-model="form.name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              v-model="form.phone"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="address"
            >
              Address
            </label>
            <textarea
              id="address"
              v-model="form.address"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="notes"
            >
              Notes
            </label>
            <textarea
              id="notes"
              v-model="form.notes"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none"
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
import type { Customer } from "@/types";

const dataStore = useDataStore();

const showModal = ref(false);
const editingCustomer = ref<Customer | null>(null);
const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
});

const customers = computed(() => dataStore.allCustomers);

onMounted(async () => {
  // Prefer store-provided customers (populated from staticData in DEV).
  if (!dataStore.allCustomers || dataStore.allCustomers.length === 0) {
    // In a real app you'd fetch from API. For now seed with mock data.
    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        notes: "Regular customer",
        created_at: "2023-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "098-765-4321",
        address: "456 Oak Ave",
        notes: "VIP customer",
        created_at: "2023-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "555-123-4567",
        address: "789 Pine Rd",
        notes: "New customer",
        created_at: "2023-01-03T00:00:00Z",
      },
    ];

    dataStore.setCustomers(mockCustomers);
  }
});

const openAddCustomerModal = () => {
  editingCustomer.value = null;
  form.value = {
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  };
  showModal.value = true;
};

// @ts-ignore
function editCustomer(customer: Customer) {
  editingCustomer.value = customer;
  form.value = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    notes: customer.notes || "",
  };
  showModal.value = true;
}

const saveCustomer = async () => {
  try {
    if (editingCustomer.value) {
      // Update existing customer
      const updatedCustomer = {
        ...editingCustomer.value,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        notes: form.value.notes,
      };

      // In a real app, you would call your API here
      // For this example, we'll update the mock data
      const index = dataStore.customers.findIndex(
        (c) => c.id === updatedCustomer.id
      );
      if (index !== -1) {
        dataStore.customers[index] = updatedCustomer;
      }
    } else {
      // Create new customer
      const newCustomer: Customer = {
        id: Math.max(0, ...dataStore.customers.map((c) => c.id)) + 1,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        notes: form.value.notes,
        created_at: new Date().toISOString(),
      };

      // In a real app, you would call your API here
      // For this example, we'll add to the mock data
      dataStore.customers.push(newCustomer);
    }

    closeModal();
  } catch (error) {
    console.error("Error saving customer:", error);
  }
};

// @ts-ignore
async function deleteCustomer(id: number) {
  if (confirm("Are you sure you want to delete this customer?")) {
    try {
      // In a real app, you would call your API here
      // For this example, we'll remove from the mock data
      dataStore.customers = dataStore.customers.filter(
        (customer) => customer.id !== id
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }
}

const closeModal = () => {
  showModal.value = false;
  editingCustomer.value = null;
};
</script>
