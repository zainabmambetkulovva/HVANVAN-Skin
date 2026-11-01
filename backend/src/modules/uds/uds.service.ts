import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import axios from 'axios';

@Injectable()
export class UDSService {
  private udsApiUrl: string;
  private udsApiKey: string;

  constructor(private prisma: PrismaService) {
    this.udsApiUrl = process.env.UDS_API_URL || '';
    this.udsApiKey = process.env.UDS_API_KEY || '';
  }

  async getBalance(userId: string) {
    const udsAccount = await this.prisma.udsAccount.findUnique({
      where: { userId },
    });

    if (!udsAccount) {
      throw new NotFoundException('UDS account not found');
    }

    return {
      balance: udsAccount.balance,
      externalCustomerId: udsAccount.externalCustomerId,
      syncedAt: udsAccount.syncedAt,
    };
  }

  async syncBalance(userId: string) {
    const udsAccount = await this.prisma.udsAccount.findUnique({
      where: { userId },
    });

    if (!udsAccount) {
      throw new NotFoundException('UDS account not found');
    }

    if (!this.udsApiUrl || !this.udsApiKey) {
      throw new Error('UDS API not configured');
    }

    try {
      const response = await axios.get(`${this.udsApiUrl}/balance/${udsAccount.externalCustomerId}`, {
        headers: { Authorization: `Bearer ${this.udsApiKey}` },
      });

      const balance = response.data.balance;

      await this.prisma.udsAccount.update({
        where: { userId },
        data: {
          balance,
          syncedAt: new Date(),
        },
      });

      return { balance };
    } catch (error) {
      throw new Error('Failed to sync UDS balance');
    }
  }

  async createTransaction(userId: string, orderId: string, transactionType: string, amount: number) {
    const udsAccount = await this.prisma.udsAccount.findUnique({
      where: { userId },
    });

    if (!udsAccount) {
      throw new NotFoundException('UDS account not found');
    }

    return this.prisma.udsTransaction.create({
      data: {
        udsAccountId: udsAccount.id,
        orderId,
        transactionType,
        amount,
        status: 'pending',
      },
    });
  }

  async completeTransaction(transactionId: string, status: string) {
    return this.prisma.udsTransaction.update({
      where: { id: transactionId },
      data: { status },
    });
  }
}
