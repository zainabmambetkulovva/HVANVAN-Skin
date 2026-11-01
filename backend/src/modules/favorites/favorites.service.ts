import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async add(userId: string, productId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      throw new BadRequestException('Product already in favorites');
    }

    return this.prisma.favorite.create({
      data: { userId, productId },
      include: { product: true },
    });
  }

  async findAll(userId: string, pagination?: any) {
    return this.prisma.favorite.findMany({
      where: { userId },
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    });
  }

  async remove(id: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.prisma.favorite.delete({
      where: { id },
    });
  }
}
