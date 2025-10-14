// src/stores/data.ts
import { defineStore } from "pinia";
import type { Item, Customer, Order, Contact, DashboardData } from "@/types";
import staticData from "@/data/staticData";

interface DataState {
  items: Item[];
  customers: Customer[];
  orders: Order[];
  contacts: Contact[];
  dashboardData: DashboardData | null;
}

export const useDataStore = defineStore("data", {
  state: (): DataState => ({
    // When developing locally, populate the store with static mock data to avoid needing the backend.
    items: import.meta.env.DEV ? (staticData.items as Item[]) : [],
    customers: import.meta.env.DEV ? (staticData.customers as Customer[]) : [],
    orders: import.meta.env.DEV ? (staticData.orders as Order[]) : [],
    contacts: import.meta.env.DEV ? (staticData.contacts as Contact[]) : [],
    dashboardData: import.meta.env.DEV
      ? (staticData.dashboardData as DashboardData)
      : null,
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
