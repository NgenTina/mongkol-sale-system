import { Request, Response } from "express";
import { prisma } from "../config/database";
import { ApiResponse } from "../types";

export const getDashboardStats = async (
  req: Request,
  res: Response<ApiResponse<any>>
) => {
  try {
    // Today's sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todaySales, totalProducts, lowStockProducts, totalRevenue] =
      await Promise.all([
        // Today's sales count
        prisma.sale.count({
          where: {
            createdAt: {
              gte: today,
              lt: tomorrow,
            },
          },
        }),

        // Total active products
        prisma.product.count({
          where: { isActive: true },
        }),

        // Low stock products
        prisma.product.count({
          where: {
            isActive: true,
            stock: {
              lte: prisma.product.fields.lowStockAlert,
            },
          },
        }),

        // Total revenue (this month)
        prisma.sale.aggregate({
          where: {
            createdAt: {
              gte: new Date(today.getFullYear(), today.getMonth(), 1),
            },
            status: "COMPLETED",
          },
          _sum: {
            total: true,
          },
        }),
      ]);

    res.json({
      success: true,
      data: {
        todaySales,
        totalProducts,
        lowStockProducts,
        totalRevenue: totalRevenue._sum.total || 0,
        recentSales: await getRecentSales(),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard stats",
    });
  }
};

const getRecentSales = async () => {
  return prisma.sale.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      saleItems: {
        include: {
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });
};
