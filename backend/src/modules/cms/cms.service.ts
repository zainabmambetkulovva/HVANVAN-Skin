import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateBannerDto } from './dtos/create-banner.dto';
import { UpdateContentPageDto } from './dtos/update-content-page.dto';

@Injectable()
export class CMSService {
  constructor(private prisma: PrismaService) {}

  async createBanner(dto: CreateBannerDto) {
    return this.prisma.banner.create({
      data: dto,
    });
  }

  async findAllBanners() {
    return this.prisma.banner.findMany({
      where: {
        isActive: true,
        startsAt: { lte: new Date() },
        endsAt: { gte: new Date() },
      },
      orderBy: { position: 'asc' },
    });
  }

  async getContentPage(slug: string) {
    const page = await this.prisma.contentPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw new NotFoundException('Content page not found');
    }

    return page;
  }

  async updateContentPage(slug: string, dto: UpdateContentPageDto) {
    return this.prisma.contentPage.update({
      where: { slug },
      data: dto,
    });
  }
}
