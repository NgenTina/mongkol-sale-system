<!-- src/views/Contacts.vue -->
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Contacts</h1>
      <button
        @click="openAddContactModal"
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
        Add Contact
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
              Position
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Company
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(contact, index) in contacts" :key="contact.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ index + 1 }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ contact.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ contact.position }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ contact.company }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ contact.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ contact.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editContact(contact)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteContact(contact.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Contact Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingContact ? "Edit Contact" : "Add New Contact" }}
          </h3>
        </div>
        <form @submit.prevent="saveContact" class="px-6 py-4">
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
              for="position"
            >
              Position
            </label>
            <input
              id="position"
              v-model="form.position"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="company"
            >
              Company
            </label>
            <input
              id="company"
              v-model="form.company"
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
import { useAuthStore } from "@/stores/auth";
import { useDataStore } from "@/stores/data";
import type { Contact } from "@/types";

const authStore = useAuthStore();
const dataStore = useDataStore();

const showModal = ref(false);
const editingContact = ref<Contact | null>(null);
const form = ref({
  name: "",
  position: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
});

const contacts = computed(() => {
  if (authStore.userRole === "admin") {
    return dataStore.allContacts;
  } else {
    // For sellers, show only their contacts (in a real app, this would be filtered by owner_id)
    return dataStore.sellerContacts;
  }
});

onMounted(async () => {
  // In a real app, you would fetch this data from your API
  // For this example, we'll use mock data
  const mockContacts: Contact[] = [
    {
      id: 1,
      name: "John Smith",
      position: "Manager",
      company: "ABC Corp",
      email: "john@abccorp.com",
      phone: "123-456-7890",
      notes: "Key contact",
      owner_id: 1,
      created_at: "2023-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "Jane Doe",
      position: "Director",
      company: "XYZ Inc",
      email: "jane@xyz.com",
      phone: "098-765-4321",
      notes: "Decision maker",
      owner_id: 1,
      created_at: "2023-01-02T00:00:00Z",
    },
    {
      id: 3,
      name: "Bob Wilson",
      position: "Sales Rep",
      company: "123 Ltd",
      email: "bob@123.com",
      phone: "555-123-4567",
      notes: "New contact",
      owner_id: 2,
      created_at: "2023-01-03T00:00:00Z",
    },
    {
      id: 4,
      name: "Alice Johnson",
      position: "CFO",
      company: "Finance Co",
      email: "alice@finance.com",
      phone: "555-987-6543",
      notes: "Financial contact",
      owner_id: 2,
      created_at: "2023-01-04T00:00:00Z",
    },
    {
      id: 5,
      name: "Charlie Brown",
      position: "CEO",
      company: "Tech Solutions",
      email: "charlie@tech.com",
      phone: "555-456-7890",
      notes: "Executive contact",
      owner_id: 1,
      created_at: "2023-01-05T00:00:00Z",
    },
  ];

  dataStore.setContacts(mockContacts);
});

const openAddContactModal = () => {
  editingContact.value = null;
  form.value = {
    name: "",
    position: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  };
  showModal.value = true;
};

const editContact = (contact: Contact) => {
  editingContact.value = contact;
  form.value = {
    name: contact.name,
    position: contact.position,
    company: contact.company,
    email: contact.email,
    phone: contact.phone,
    notes: contact.notes || "",
  };
  showModal.value = true;
};

const saveContact = async () => {
  try {
    if (editingContact.value) {
      // Update existing contact
      const updatedContact = {
        ...editingContact.value,
        name: form.value.name,
        position: form.value.position,
        company: form.value.company,
        email: form.value.email,
        phone: form.value.phone,
        notes: form.value.notes,
      };

      // In a real app, you would call your API here
      // For this example, we'll update the mock data
      const index = dataStore.contacts.findIndex(
        (c) => c.id === updatedContact.id
      );
      if (index !== -1) {
        dataStore.contacts[index] = updatedContact;
      }
    } else {
      // Create new contact
      const newContact: Contact = {
        id: Math.max(0, ...dataStore.contacts.map((c) => c.id)) + 1,
        name: form.value.name,
        position: form.value.position,
        company: form.value.company,
        email: form.value.email,
        phone: form.value.phone,
        notes: form.value.notes,
        owner_id: authStore.currentUser?.id || 1,
        created_at: new Date().toISOString(),
      };

      // In a real app, you would call your API here
      // For this example, we'll add to the mock data
      dataStore.contacts.push(newContact);
    }

    closeModal();
  } catch (error) {
    console.error("Error saving contact:", error);
  }
};

const deleteContact = async (id: number) => {
  if (confirm("Are you sure you want to delete this contact?")) {
    try {
      // In a real app, you would call your API here
      // For this example, we'll remove from the mock data
      dataStore.contacts = dataStore.contacts.filter(
        (contact) => contact.id !== id
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }
};

const closeModal = () => {
  showModal.value = false;
  editingContact.value = null;
};
</script>
