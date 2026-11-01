import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CMSService } from './cms.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateBannerDto } from './dtos/create-banner.dto';
import { UpdateContentPageDto } from './dtos/update-content-page.dto';

@Controller('cms')
@UseGuards(JwtAuthGuard)
export class CMSController {
  constructor(private cmsService: CMSService) {}

  @Post('banner')
  createBanner(@Body() dto: CreateBannerDto) {
    return this.cmsService.createBanner(dto);
  }

  @Get('banners')
  findAllBanners() {
    return this.cmsService.findAllBanners();
  }

  @Get('page/:slug')
  getContentPage(@Param('slug') slug: string) {
    return this.cmsService.getContentPage(slug);
  }

  @Patch('page/:slug')
  updateContentPage(@Param('slug') slug: string, @Body() dto: UpdateContentPageDto) {
    return this.cmsService.updateContentPage(slug, dto);
  }
}
