// src/stores/data.ts
import { defineStore } from "pinia";
import type { Item, Customer, Order, Contact, DashboardData } from "@/types";

interface DataState {
  items: Item[];
  customers: Customer[];
  orders: Order[];
  contacts: Contact[];
  dashboardData: DashboardData | null;
}

export const useDataStore = defineStore("data", {
  state: (): DataState => ({
    items: [],
    customers: [],
    orders: [],
    contacts: [],
    dashboardData: null,
  }),

  getters: {
    allItems: (state): Item[] => state.items,
    allCustomers: (state): Customer[] => state.customers,
    allOrders: (state): Order[] => state.orders,
    allContacts: (state): Contact[] => state.contacts,
    sellerItems: (state): Item[] => state.items,
    sellerOrders: (state): Order[] => state.orders,
    sellerContacts: (state): Contact[] => state.contacts,
  },

  actions: {
    setItems(items: Item[]) {
      this.items = items;
    },

    setCustomers(customers: Customer[]) {
      this.customers = customers;
    },

    setOrders(orders: Order[]) {
      this.orders = orders;
    },

    setContacts(contacts: Contact[]) {
      this.contacts = contacts;
    },

    setDashboardData(data: DashboardData) {
      this.dashboardData = data;
    },

    // Seller-specific data filtering
    filterSellerData(_userId: number) {
      // In a real app, this would come from the API
      // For now, we'll just set all data since we're using mock data
    },
  },
});
