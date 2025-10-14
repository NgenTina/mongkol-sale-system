<!-- src/views/Profile.vue -->
<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Profile</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex flex-col items-center">
            <div
              class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center"
            >
              <svg
                class="h-8 w-8 text-gray-400"
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
            <h2 class="text-xl font-bold mt-4">{{ user?.name }}</h2>
            <p class="text-gray-600">{{ user?.email }}</p>
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2"
            >
              {{ user?.role }}
            </span>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-900">Account Settings</h3>
            <div class="mt-4 space-y-2">
              <button
                @click="showChangePasswordModal = true"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Change Password
              </button>
              <button
                @click="showUpdateProfileModal = true"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Update Profile
              </button>
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            Personal Information
          </h2>

          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Full Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Phone</label
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Address</label
                >
                <input
                  v-model="form.address"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Bio</label
                >
                <textarea
                  v-model="form.bio"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                ></textarea>
              </div>
            </div>

            <div class="mt-6">
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium text-gray-900">Change Password</h3>
        </div>
        <form @submit.prevent="changePassword" class="px-6 py-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="currentPassword"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newPassword"
            >
              New Password
            </label>
            <input
              id="newPassword"
              v-model="passwordForm.newPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="showChangePasswordModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);

const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  bio: "",
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const showChangePasswordModal = ref(false);
const showUpdateProfileModal = ref(false);

onMounted(() => {
  if (user.value) {
    form.value = {
      name: user.value.name,
      email: user.value.email,
      phone: user.value.phone || "",
      address: user.value.address || "",
      bio: user.value.bio || "",
    };
  }
});

const updateProfile = async () => {
  try {
    // In a real app, you would call your API here
    // For this example, we'll update the mock data
    if (user.value) {
      const updatedUser: User = {
        ...user.value,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        bio: form.value.bio,
      };

      // Update the store
      authStore.setAuth(updatedUser, authStore.token || "");

      alert("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Error updating profile. Please try again.");
  }
};

const changePassword = async () => {
  try {
    // Validate passwords
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    // In a real app, you would call your API here
    // For this example, we'll just close the modal
    alert("Password changed successfully!");
    showChangePasswordModal.value = false;
  } catch (error) {
    console.error("Error changing password:", error);
    alert("Error changing password. Please try again.");
  }
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
