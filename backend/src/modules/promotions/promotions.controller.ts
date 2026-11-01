import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreatePromotionDto } from './dtos/create-promotion.dto';
import { CreatePromoCodeDto } from './dtos/create-promo-code.dto';

@Controller('promotions')
@UseGuards(JwtAuthGuard)
export class PromotionsController {
  constructor(private promotionsService: PromotionsService) {}

  @Post('promotion')
  createPromotion(@Body() dto: CreatePromotionDto) {
    return this.promotionsService.createPromotion(dto);
  }

  @Post('promo-code')
  createPromoCode(@Body() dto: CreatePromoCodeDto) {
    return this.promotionsService.createPromoCode(dto);
  }

  @Get('promotions')
  findAllPromotions() {
    return this.promotionsService.findAllPromotions();
  }

  @Get('promo-codes')
  findAllPromoCodes() {
    return this.promotionsService.findAllPromoCodes();
  }

  @Get('promo-code/:code')
  findPromoCode(@Param('code') code: string) {
    return this.promotionsService.findOnePromoCode(code);
  }
}
