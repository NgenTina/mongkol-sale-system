// src/data/staticData.ts
import type {
  Item,
  Customer,
  Order,
  Contact,
  DashboardData,
  OrderItem,
} from "@/types";

const now = new Date().toISOString();

export const items: Item[] = [
  {
    id: 1,
    name: "Silk Scarf",
    price: 29.99,
    stock: 120,
    category: "Apparel",
    description: "Handmade silk scarf",
    owner_id: 1,
    created_at: now,
  },
  {
    id: 2,
    name: "Ceramic Mug",
    price: 12.5,
    stock: 80,
    category: "Home",
    description: "Glazed ceramic mug",
    owner_id: 1,
    created_at: now,
  },
  {
    id: 3,
    name: "Bamboo Basket",
    price: 24.0,
    stock: 40,
    category: "Home",
    description: "Handwoven basket",
    owner_id: 2,
    created_at: now,
  },
  {
    id: 4,
    name: "Organic Tea",
    price: 8.75,
    stock: 200,
    category: "Grocery",
    description: "Loose leaf organic tea",
    owner_id: 2,
    created_at: now,
  },
];

export const customers: Customer[] = [
  {
    id: 1,
    name: "Somchai Prasert",
    email: "somchai@example.com",
    phone: "0812345678",
    address: "123 Bangkok Rd",
    notes: "VIP",
    created_at: now,
  },
  {
    id: 2,
    name: "Ariyaporn N.",
    email: "ariya@example.com",
    phone: "0898765432",
    address: "45 Chiang Mai St",
    notes: "Prefers email",
    created_at: now,
  },
];

export const orderItems: OrderItem[] = [
  { id: 1, order_id: 1, item_id: 1, quantity: 2 },
  { id: 2, order_id: 1, item_id: 2, quantity: 1 },
  { id: 3, order_id: 2, item_id: 4, quantity: 3 },
];

export const orders: Order[] = [
  {
    id: 1,
    customer_id: 1,
    status: "confirmed",
    total: 72.48,
    created_at: now,
    items: orderItems.filter((oi) => oi.order_id === 1),
    customer_name: "Somchai Prasert",
    customer_email: "somchai@example.com",
    customer_phone: "0812345678",
    customer_address: "123 Bangkok Rd",
    items_count: 3,
  },
  {
    id: 2,
    customer_id: 2,
    status: "pending",
    total: 26.25,
    created_at: now,
    items: orderItems.filter((oi) => oi.order_id === 2),
    customer_name: "Ariyaporn N.",
    customer_email: "ariya@example.com",
    customer_phone: "0898765432",
    customer_address: "45 Chiang Mai St",
    items_count: 3,
  },
];

export const contacts: Contact[] = [
  {
    id: 1,
    name: "Kanya S.",
    position: "Purchasing",
    company: "Bangkok Traders",
    email: "kanya@bktraders.com",
    phone: "02-123-4567",
    notes: "Main supplier contact",
    owner_id: 1,
    created_at: now,
  },
  {
    id: 2,
    name: "Niran T.",
    position: "Manager",
    company: "Chiang Co.",
    email: "niran@chiangco.com",
    phone: "053-444-555",
    notes: "Follow up on shipment",
    owner_id: 2,
    created_at: now,
  },
];

export const dashboardData: DashboardData = {
  totalOrders: orders.length,
  totalCustomers: customers.length,
  totalItems: items.length,
  topOrders: [
    { id: 1, name: "Thai Silk Scarf", quantity: 42 },
    { id: 4, name: "Organic Tea", quantity: 31 },
  ],
};

export default { items, customers, orders, contacts, dashboardData };
