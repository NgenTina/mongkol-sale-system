// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'seller';
  phone?: string;
  address?: string;
  bio?: string;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  owner_id: number;
  created_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  created_at: string;
}

export interface Order {
  id: number;
  customer_id: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  created_at: string;
  items: OrderItem[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items_count: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  item_id: number;
  quantity: number;
}

export interface Contact {
  id: number;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  notes?: string;
  owner_id: number;
  created_at: string;
}

export interface DashboardData {
  totalOrders: number;
  totalCustomers: number;
  totalItems: number;
  topOrders: { id: number; name: string; quantity: number }[];
}