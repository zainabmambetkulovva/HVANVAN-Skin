import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreatePromotionDto } from './dtos/create-promotion.dto';
import { CreatePromoCodeDto } from './dtos/create-promo-code.dto';

@Injectable()
export class PromotionsService {
  constructor(private prisma: PrismaService) {}

  async createPromotion(dto: CreatePromotionDto) {
    return this.prisma.promotion.create({
      data: dto,
    });
  }

  async createPromoCode(dto: CreatePromoCodeDto) {
    const existingCode = await this.prisma.promoCode.findUnique({
      where: { code: dto.code },
    });

    if (existingCode) {
      throw new BadRequestException('Promo code already exists');
    }

    return this.prisma.promoCode.create({
      data: dto,
    });
  }

  async findAllPromotions() {
    return this.prisma.promotion.findMany({
      where: {
        startsAt: { lte: new Date() },
        endsAt: { gte: new Date() },
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPromoCodes() {
    return this.prisma.promoCode.findMany({
      where: {
        startsAt: { lte: new Date() },
        endsAt: { gte: new Date() },
        isActive: true,
      },
      include: { promotion: true },
    });
  }

  async findOnePromoCode(code: string) {
    return this.prisma.promoCode.findUnique({
      where: { code },
      include: { promotion: true },
    });
  }
}
