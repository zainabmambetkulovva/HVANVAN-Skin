import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.order.create({
      data: {
        ...dto,
        userId,
        status: 'created',
        createdAt: new Date(),
      },
      include: {
        user: true,
        items: true,
      },
    });
  }

  async findAll(filters?: { status?: string }, pagination?: any) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.order.findMany({
      where,
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        items: true,
        branch: true,
      },
    });
  }

  async findMyOrders(userId: string, pagination?: any) {
    return this.prisma.order.findMany({
      where: { userId },
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        items: true,
        branch: true,
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: true,
        branch: true,
        payments: true,
        statusHistory: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id },
      data: dto,
    });
  }

  async updateStatus(id: string, status: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const previousStatus = order.status;

    return this.prisma.order.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        items: true,
      },
    });
  }
}
