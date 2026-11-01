import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { InventoryTransactionDto } from './dtos/inventory-transaction.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: { productId?: string; branchId?: string }) {
    const where: any = {};

    if (filters?.productId) {
      where.productId = filters.productId;
    }

    if (filters?.branchId) {
      where.branchId = filters.branchId;
    }

    return this.prisma.productInventory.findMany({
      where,
      include: {
        product: true,
        branch: true,
      },
    });
  }

  async findOne(id: string) {
    const inventory = await this.prisma.productInventory.findUnique({
      where: { id },
      include: {
        product: true,
        branch: true,
      },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    return inventory;
  }

  async update(id: string, dto: UpdateInventoryDto) {
    const inventory = await this.prisma.productInventory.findUnique({
      where: { id },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    return this.prisma.productInventory.update({
      where: { id },
      data: dto,
    });
  }

  async createTransaction(dto: InventoryTransactionDto) {
    const { productId, branchId, transactionType, quantity, orderId, comment } = dto;

    const inventory = await this.prisma.productInventory.findUnique({
      where: {
        productId_branchId: {
          productId,
          branchId,
        },
      },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    const quantityBefore = inventory.quantity;
    let quantityAfter = quantityBefore;

    if (transactionType === 'sale' || transactionType === 'write_off') {
      quantityAfter = quantityBefore - quantity;
    } else if (transactionType === 'receipt' || transactionType === 'return' || transactionType === 'adjustment') {
      quantityAfter = quantityBefore + quantity;
    }

    if (quantityAfter < 0) {
      throw new BadRequestException('Insufficient inventory');
    }

    await this.prisma.$transaction([
      this.prisma.productInventory.update({
        where: {
          productId_branchId: {
            productId,
            branchId,
          },
        },
        data: {
          quantity: quantityAfter,
          updatedAt: new Date(),
        },
      }),
      this.prisma.inventoryTransaction.create({
        data: {
          productId,
          branchId,
          transactionType,
          quantity,
          quantityBefore,
          quantityAfter,
          comment,
          orderId,
        },
      }),
    ]);

    return {
      productId,
      branchId,
      quantityBefore,
      quantityAfter,
      transactionType,
    };
  }
}
