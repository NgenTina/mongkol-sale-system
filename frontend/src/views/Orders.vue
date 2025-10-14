<!-- src/views/Orders.vue -->
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Orders</h1>
      <button
        @click="openAddOrderModal"
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
        Add Order
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
              Customer
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Items
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
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
          <tr v-for="(order, index) in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ index + 1 }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ order.customer_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ order.items_count }} items
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ order.total }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  getStatusClass(order.status),
                ]"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(order.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="viewOrder(order)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                View
              </button>
              <button
                @click="updateOrderStatus(order)"
                class="text-green-600 hover:text-green-900 mr-3"
              >
                Update
              </button>
              <button
                @click="deleteOrder(order.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Order Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div class="px-6 py-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Order Details</h3>
          <button
            @click="closeViewModal"
            class="text-gray-500 hover:text-gray-700"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div v-if="selectedOrder" class="px-6 py-4">
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="text-md font-medium text-gray-700 mb-2">
                Customer Information
              </h4>
              <p>
                <span class="font-medium">Name:</span>
                {{ selectedOrder.customer_name }}
              </p>
              <p>
                <span class="font-medium">Email:</span>
                {{ selectedOrder.customer_email }}
              </p>
              <p>
                <span class="font-medium">Phone:</span>
                {{ selectedOrder.customer_phone }}
              </p>
              <p>
                <span class="font-medium">Address:</span>
                {{ selectedOrder.customer_address }}
              </p>
            </div>
            <div>
              <h4 class="text-md font-medium text-gray-700 mb-2">
                Order Information
              </h4>
              <p>
                <span class="font-medium">Order ID:</span>
                {{ selectedOrder.id }}
              </p>
              <p>
                <span class="font-medium">Status:</span>
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusClass(selectedOrder.status),
                  ]"
                >
                  {{ selectedOrder.status }}
                </span>
              </p>
              <p>
                <span class="font-medium">Date:</span>
                {{ formatDate(selectedOrder.created_at) }}
              </p>
              <p>
                <span class="font-medium">Total:</span> ${{
                  selectedOrder.total
                }}
              </p>
            </div>
          </div>

          <h4 class="text-md font-medium text-gray-700 mb-2">Order Items</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in selectedOrder.items" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getItemName(item.item_id) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${{ getItemPrice(item.item_id) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ item.quantity }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${{
                      (getItemPrice(item.item_id) * item.quantity).toFixed(2)
                    }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td
                    colspan="3"
                    class="px-6 py-3 text-right text-sm font-medium text-gray-900"
                  >
                    Total:
                  </td>
                  <td class="px-6 py-3 text-sm font-medium text-gray-900">
                    ${{ selectedOrder.total }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Order Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div class="px-6 py-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingOrder ? "Edit Order" : "Add New Order" }}
          </h3>
          <button
            @click="closeAddModal"
            class="text-gray-500 hover:text-gray-700"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form @submit.prevent="saveOrder" class="px-6 py-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="customer"
            >
              Customer
            </label>
            <select
              id="customer"
              v-model="form.customer_id"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Customer</option>
              <option
                v-for="customer in customers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.name }} ({{ customer.email }})
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Order Items</label
            >
            <div class="flex gap-2 mb-2">
              <select
                v-model="selectedItem"
                class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Item</option>
                <option v-for="item in items" :key="item.id" :value="item.id">
                  {{ item.name }} - ${{ item.price }}
                </option>
              </select>
              <input
                v-model="itemQuantity"
                type="number"
                min="1"
                class="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Qty"
              />
              <button
                type="button"
                @click="addItemToOrder"
                class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Add
              </button>
            </div>

            <div v-if="form.items.length > 0" class="mt-4">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subtotal
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
                  <tr v-for="(item, index) in form.items" :key="index">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ getItemName(item.item_id) }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      ${{ getItemPrice(item.item_id) }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ item.quantity }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      ${{
                        (getItemPrice(item.item_id) * item.quantity).toFixed(2)
                      }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        @click="removeItem(index)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td
                      colspan="3"
                      class="px-6 py-3 text-right text-sm font-medium text-gray-900"
                    >
                      Total:
                    </td>
                    <td class="px-6 py-3 text-sm font-medium text-gray-900">
                      ${{ calculateTotal }}
                    </td>
                    <td class="px-6 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="status"
            >
              Status
            </label>
            <select
              id="status"
              v-model="form.status"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div class="flex items-center justify-between mt-6">
            <button
              type="button"
              @click="closeAddModal"
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
import type { Order, Customer, Item } from "@/types";

const dataStore = useDataStore();

const showViewModal = ref(false);
const showAddModal = ref(false);
const editingOrder = ref<Order | null>(null);
const selectedOrder = ref<Order | null>(null);
const form = ref({
  customer_id: 0,
  items: [] as { item_id: number; quantity: number }[],
  status: "pending" as
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled",
  total: 0,
});
const selectedItem = ref(0);
const itemQuantity = ref(1);

const orders = computed(() => dataStore.allOrders);
const customers = computed(() => dataStore.allCustomers);
const items = computed(() => dataStore.allItems);

onMounted(async () => {
  // In a real app, you would fetch this data from your API
  // For this example, we'll use mock data
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

  const mockItems: Item[] = [
    {
      id: 1,
      name: "Laptop",
      price: 999.99,
      stock: 10,
      category: "Electronics",
      description: "High-performance laptop",
      owner_id: 1,
      created_at: "2023-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "T-Shirt",
      price: 19.99,
      stock: 50,
      category: "Clothing",
      description: "Comfortable cotton t-shirt",
      owner_id: 1,
      created_at: "2023-01-02T00:00:00Z",
    },
    {
      id: 3,
      name: "Novel",
      price: 14.99,
      stock: 25,
      category: "Books",
      description: "Bestselling novel",
      owner_id: 2,
      created_at: "2023-01-03T00:00:00Z",
    },
    {
      id: 4,
      name: "Plant Pot",
      price: 24.99,
      stock: 15,
      category: "Home & Garden",
      description: "Ceramic plant pot",
      owner_id: 2,
      created_at: "2023-01-04T00:00:00Z",
    },
    {
      id: 5,
      name: "Toy Car",
      price: 29.99,
      stock: 30,
      category: "Toys",
      description: "Die-cast toy car",
      owner_id: 1,
      created_at: "2023-01-05T00:00:00Z",
    },
  ];

  const mockOrders: Order[] = [
    {
      id: 1,
      customer_id: 1,
      status: "delivered",
      total: 999.99,
      created_at: "2023-01-10T10:30:00Z",
      items: [{ id: 1, order_id: 1, item_id: 1, quantity: 1 }],
      customer_name: "John Doe",
      customer_email: "john@example.com",
      customer_phone: "123-456-7890",
      customer_address: "123 Main St",
      items_count: 1,
    },
    {
      id: 2,
      customer_id: 2,
      status: "shipped",
      total: 39.98,
      created_at: "2023-01-11T14:20:00Z",
      items: [{ id: 2, order_id: 2, item_id: 2, quantity: 2 }],
      customer_name: "Jane Smith",
      customer_email: "jane@example.com",
      customer_phone: "098-765-4321",
      customer_address: "456 Oak Ave",
      items_count: 2,
    },
    {
      id: 3,
      customer_id: 3,
      status: "confirmed",
      total: 14.99,
      created_at: "2023-01-12T09:15:00Z",
      items: [{ id: 3, order_id: 3, item_id: 3, quantity: 1 }],
      customer_name: "Bob Johnson",
      customer_email: "bob@example.com",
      customer_phone: "555-123-4567",
      customer_address: "789 Pine Rd",
      items_count: 1,
    },
  ];

  dataStore.setCustomers(mockCustomers);
  dataStore.setItems(mockItems);
  dataStore.setOrders(mockOrders);
});

const getStatusClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-indigo-100 text-indigo-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

const getItemName = (itemId: number) => {
  const item = items.value.find((i) => i.id === itemId);
  return item ? item.name : "Unknown Item";
};

const getItemPrice = (itemId: number) => {
  const item = items.value.find((i) => i.id === itemId);
  return item ? item.price : 0;
};

const calculateTotal = computed(() => {
  let total = 0;
  form.value.items.forEach((item) => {
    const price = getItemPrice(item.item_id);
    total += price * item.quantity;
  });
  return total.toFixed(2);
});

const viewOrder = (order: Order) => {
  selectedOrder.value = order;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  selectedOrder.value = null;
};

const openAddOrderModal = () => {
  editingOrder.value = null;
  form.value = {
    customer_id: 0,
    items: [],
    status: "pending",
    total: 0,
  };
  selectedItem.value = 0;
  itemQuantity.value = 1;
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
  editingOrder.value = null;
};

const addItemToOrder = () => {
  if (!selectedItem.value || !itemQuantity.value || itemQuantity.value <= 0) {
    return;
  }

  // Check if item already exists in order
  const existingItemIndex = form.value.items.findIndex(
    (item) => item.item_id === selectedItem.value
  );

  if (existingItemIndex >= 0) {
    // Update quantity
    const existingItem = form.value.items[existingItemIndex];
    if (existingItem) {
      existingItem.quantity += parseInt(itemQuantity.value.toString());
    }
  } else {
    // Add new item
    form.value.items.push({
      item_id: selectedItem.value,
      quantity: parseInt(itemQuantity.value.toString()),
    });
  }

  // Reset selection
  selectedItem.value = 0;
  itemQuantity.value = 1;
};

const removeItem = (index: number) => {
  form.value.items.splice(index, 1);
};

const updateOrderStatus = (order: Order) => {
  // In a real app, you would prompt for a new status
  // For this example, we'll just log it
  console.log("Update order status:", order);
};

const saveOrder = async () => {
  try {
    // Calculate total
    let total = 0;
    form.value.items.forEach((item) => {
      const price = getItemPrice(item.item_id);
      total += price * item.quantity;
    });

    // Create order object
    const orderData = {
      id: Math.max(0, ...dataStore.orders.map((o) => o.id)) + 1,
      customer_id: form.value.customer_id,
      status: form.value.status,
      total: total,
      created_at: new Date().toISOString(),
      items: form.value.items.map((item, index) => ({
        id: index + 1,
        order_id: 0, // Will be set after order is created
        item_id: item.item_id,
        quantity: item.quantity,
      })),
      customer_name:
        customers.value.find((c) => c.id === form.value.customer_id)?.name ||
        "",
      customer_email:
        customers.value.find((c) => c.id === form.value.customer_id)?.email ||
        "",
      customer_phone:
        customers.value.find((c) => c.id === form.value.customer_id)?.phone ||
        "",
      customer_address:
        customers.value.find((c) => c.id === form.value.customer_id)?.address ||
        "",
      items_count: form.value.items.length,
    };

    // In a real app, you would call your API here
    // For this example, we'll add to the mock data
    dataStore.orders.push(orderData);

    closeAddModal();
  } catch (error) {
    console.error("Error saving order:", error);
  }
};

const deleteOrder = async (id: number) => {
  if (confirm("Are you sure you want to delete this order?")) {
    try {
      // In a real app, you would call your API here
      // For this example, we'll remove from the mock data
      dataStore.orders = dataStore.orders.filter((order) => order.id !== id);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }
};
</script>
