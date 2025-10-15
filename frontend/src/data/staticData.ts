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
    name: "កន្សែងសូត្រ" /* Silk Scarf */,
    price: 29.99,
    stock: 120,
    category: "សម្លៀកបំពាក់" /* Apparel */,
    description: "កន្សែងសូត្រដៃ" /* Handmade silk scarf */,
    owner_id: 1,
    created_at: now,
  },
  {
    id: 2,
    name: "កែវសេរ៉ាមិច" /* Ceramic Mug */,
    price: 12.5,
    stock: 80,
    category: "ផ្ទះ" /* Home */,
    description: "កែវសេរ៉ាមិចមានក្រចក" /* Glazed ceramic mug */,
    owner_id: 1,
    created_at: now,
  },
  {
    id: 3,
    name: "កន្ត្រកឫស្សី" /* Bamboo Basket */,
    price: 24.0,
    stock: 40,
    category: "ផ្ទះ" /* Home */,
    description: "កន្ត្រកស្រស់ស្អាត" /* Handwoven basket */,
    owner_id: 2,
    created_at: now,
  },
  {
    id: 4,
    name: "តែសរីរាង្គ" /* Organic Tea */,
    price: 8.75,
    stock: 200,
    category: "ម្ហូបអាហារ" /* Grocery */,
    description: "តែសរីរាង្គស្លឹក" /* Loose leaf organic tea */,
    owner_id: 2,
    created_at: now,
  },
];

export const customers: Customer[] = [
  {
    id: 1,
    name: "សំឆៃ ប្រសើរ" /* Somchai Prasert */,
    email: "somchai@example.com",
    phone: "0812345678",
    address: "ផ្លូវ ១២៣, បាងកក" /* 123 Bangkok Rd */,
    notes: "អតិថិជនសំខាន់" /* VIP */,
    created_at: now,
  },
  {
    id: 2,
    name: "អរិយព័ន្ធ ណ." /* Ariyaporn N. */,
    email: "ariya@example.com",
    phone: "0898765432",
    address: "ផ្លូវ ៤៥, ជាងម៉ៃ" /* 45 Chiang Mai St */,
    notes: "ចូលចិត្តអ៊ីមែល" /* Prefers email */,
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
    status: "confirmed" /* confirmed */,
    total: 72.48,
    created_at: now,
    items: orderItems.filter((oi) => oi.order_id === 1),
    customer_name: "សំឆៃ ប្រសើរ" /* Somchai Prasert */,
    customer_email: "somchai@example.com",
    customer_phone: "0812345678",
    customer_address: "ផ្លូវ ១២៣, បាងកក" /* 123 Bangkok Rd */,
    items_count: 3,
  },
  {
    id: 2,
    customer_id: 2,
    status: "pending" /* pending */,
    total: 26.25,
    created_at: now,
    items: orderItems.filter((oi) => oi.order_id === 2),
    customer_name: "អរិយព័ន្ធ ណ." /* Ariyaporn N. */,
    customer_email: "ariya@example.com",
    customer_phone: "0898765432",
    customer_address: "ផ្លូវ ៤៥, ជាងម៉ៃ" /* 45 Chiang Mai St */,
    items_count: 3,
  },
];

export const contacts: Contact[] = [
  {
    id: 1,
    name: "កញ្ញា ស." /* Kanya S. */,
    position: "ផ្នែកទិញ" /* Purchasing */,
    company: "ក្រុមហ៊ុន បាងកក" /* Bangkok Traders */,
    email: "kanya@bktraders.com",
    phone: "02-123-4567",
    notes: "អ្នកទំនាក់ទំនងផ្គត់ផ្គង់" /* Main supplier contact */,
    owner_id: 1,
    created_at: now,
  },
  {
    id: 2,
    name: "និរ៉ាន់ ត." /* Niran T. */,
    position: "អ្នកគ្រប់គ្រង" /* Manager */,
    company: "ក្រុមហ៊ុន ជាង" /* Chiang Co. */,
    email: "niran@chiangco.com",
    phone: "053-444-555",
    notes: "តាមដានការដឹកជញ្ជូន" /* Follow up on shipment */,
    owner_id: 2,
    created_at: now,
  },
];

export const dashboardData: DashboardData = {
  totalOrders: orders.length,
  totalCustomers: customers.length,
  totalItems: items.length,
  topOrders: [
    { id: 1, name: "កន្សែងសូត្រ" /* Thai Silk Scarf */, quantity: 42 },
    { id: 4, name: "តែសរីរាង្គ" /* Organic Tea */, quantity: 31 },
  ],
};

export default { items, customers, orders, contacts, dashboardData };
