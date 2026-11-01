import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateConsultationDto } from './dtos/create-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateConsultationDto) {
    return this.prisma.consultation.create({
      data: dto,
    });
  }

  async findAll(pagination?: any) {
    return this.prisma.consultation.findMany({
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return consultation;
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.consultation.update({
      where: { id },
      data: { status },
    });
  }

  async assign(id: string, assignedToId: string) {
    return this.prisma.consultation.update({
      where: { id },
      data: { assignedToId },
    });
  }
}
