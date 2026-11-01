import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { WebhookDto } from './dtos/webhook.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    const { orderId, providerId, paymentMethod, amount, currency, externalTransactionId, idempotencyKey } = dto;

    const existingPayment = await this.prisma.payment.findUnique({
      where: { idempotencyKey },
    });

    if (existingPayment) {
      return existingPayment;
    }

    return this.prisma.payment.create({
      data: {
        orderId,
        providerId,
        paymentMethod,
        amount,
        currency: currency || 'KGS',
        externalTransactionId,
        idempotencyKey,
        status: 'pending',
      },
    });
  }

  async findAll(filters?: { orderId?: string }) {
    const where: any = {};

    if (filters?.orderId) {
      whereorderId = filters.orderId;
    }

    return this.prisma.payment.findMany({
      where,
      include: {
        order: true,
        provider: true,
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        order: true,
        provider: true,
        events: true,
        refunds: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async handleWebhook(dto: WebhookDto) {
    const { paymentId, externalEventId, eventType, payload } = dto;

    const existingEvent = await this.prisma.paymentEvent.findUnique({
      where: { externalEventId },
    });

    if (existingEvent) {
      return { message: 'Event already processed' };
    }

    return this.prisma.paymentEvent.create({
      data: {
        paymentId,
        externalEventId,
        eventType,
        payload: JSON.stringify(payload),
      },
    });
  }
}
