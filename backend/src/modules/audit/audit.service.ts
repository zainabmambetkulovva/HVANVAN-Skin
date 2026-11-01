import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateAuditLogDto } from './dtos/create-audit-log.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAuditLogDto) {
    return this.prisma.auditLog.create({
      data: dto,
    });
  }

  async findAll(filters?: { userId?: string; entityType?: string }, pagination?: any) {
    const where: any = {};

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    if (filters?.entityType) {
      where.entityType = filters.entityType;
    }

    return this.prisma.auditLog.findMany({
      where,
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.auditLog.findUnique({
      where: { id },
    });
  }
}
