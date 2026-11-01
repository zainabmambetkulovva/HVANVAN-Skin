import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalOrders, totalSales, totalProducts, totalCustomers, activeUsers] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.aggregate({ _sum: { totalAmount: true } }),
      this.prisma.product.count({ where: { isActive: true } }),
      this.prisma.user.count({ where: { is_active: true } }),
      this.prisma.user.count({ where: { is_active: true, updatedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    ]);

    return {
      totalOrders,
      totalSales: totalSales._sum.totalAmount || 0,
      totalProducts,
      totalCustomers,
      activeUsers,
    };
  }

  async getSalesByPeriod(period: string = 'month') {
    const now = new Date();
    let startDate: Date;

    if (period === 'day') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === 'week') {
      startDate = new Date(now.setDate(now.getDate() - 7));
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return this.prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        status: { in: ['confirmed', 'processing', 'ready', 'completed'] },
      },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
        status: true,
      },
    });
  }

  async getTopProducts(limit: number = 10) {
    return this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, totalPrice: true },
      where: {
        order: {
          status: { in: ['confirmed', 'completed'] },
        },
      },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });
  }

  async getSalesByBranch() {
    return this.prisma.order.groupBy({
      by: ['branchId'],
      _sum: { totalAmount: true, subtotal: true },
      where: {
        status: { in: ['confirmed', 'completed'] },
      },
    });
  }
}
