import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePermissionDto) {
    const existingPermission = await this.prisma.permission.findUnique({
      where: { code: dto.code },
    });

    if (existingPermission) {
      throw new ConflictException('Permission with this code already exists');
    }

    return this.prisma.permission.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.permission.findMany();
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    if (dto.code) {
      const existingPermission = await this.prisma.permission.findUnique({
        where: { code: dto.code },
      });

      if (existingPermission && existingPermission.id !== id) {
        throw new ConflictException('Permission with this code already exists');
      }
    }

    return this.prisma.permission.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
