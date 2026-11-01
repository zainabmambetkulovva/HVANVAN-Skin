import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateReviewDto } from './dtos/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    const { userId, productId, rating, comment } = dto;

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    return this.prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment,
        status: 'pending',
      },
    });
  }

  async findAll(filters?: { productId?: string }, pagination?: any) {
    const where: any = {};

    if (filters?.productId) {
      where.productId = filters.productId;
    }

    return this.prisma.review.findMany({
      where,
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        product: true,
        images: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        product: true,
        images: true,
        replies: true,
      },
    });
  }

  async update(id: string, dto: any) {
    return this.prisma.review.update({
      where: { id },
      data: dto,
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.review.update({
      where: { id },
      data: { status },
    });
  }
}
