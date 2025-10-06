import { User, Product, Sale, SaleItem, UserRole, SaleStatus, PaymentMethod } from '@prisma/client'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth types
export interface LoginInput {
  email: string
  password: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}

// Product types
export interface CreateProductInput {
  name: string
  description?: string
  price: number
  costPrice: number
  sku?: string
  category?: string
  image?: string
  stock?: number
  lowStockAlert?: number
}

export interface UpdateProductInput {
  name?: string
  description?: string
  price?: number
  costPrice?: number
  sku?: string
  category?: string
  image?: string
  stock?: number
  lowStockAlert?: number
  isActive?: boolean
}

// Sale types
export interface CreateSaleInput {
  items: {
    productId: number
    quantity: number
  }[]
  paymentMethod: PaymentMethod
}

// Extended types with relations
export type ProductWithUser = Product & {
  user: Omit<User, 'password'>
}

export type SaleWithDetails = Sale & {
  user: Omit<User, 'password'>
  saleItems: (SaleItem & {
    product: Product
  })[]
}

export type UserWithStats = Omit<User, 'password'> & {
  _count?: {
    products: number
    sales: number
  }
  totalSales?: number
}