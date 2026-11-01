import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateRefundDto } from './dtos/create-refund.dto';

@Injectable()
export class RefundsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRefundDto) {
    const { paymentId, orderId, amount, reason } = dto;

    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { refunds: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const totalRefunded = payment.refunds.reduce((sum, r) => sum + r.amount, 0);

    if (totalRefunded + amount > payment.amount) {
      throw new BadRequestException('Refund amount exceeds paid amount');
    }

    return this.prisma.refund.create({
      data: {
        paymentId,
        orderId,
        amount,
        reason,
        status: 'pending',
      },
    });
  }

  async findAll() {
    return this.prisma.refund.findMany({
      include: {
        payment: true,
        order: true,
      },
    });
  }

  async findOne(id: string) {
    const refund = await this.prisma.refund.findUnique({
      where: { id },
      include: {
        payment: true,
        order: true,
      },
    });

    if (!refund) {
      throw new NotFoundException('Refund not found');
    }

    return refund;
  }
}
