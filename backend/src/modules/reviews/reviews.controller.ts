import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Pagination } from '@common/decorators/pagination.decorator';

@Controller('reviews')
export class ReviewsController {
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get()
  findAll(@Query('productId') productId?: string, @Pagination() pagination?: any) {
    return this.reviewsService.findAll({ productId }, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewsService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.reviewsService.updateStatus(id, status);
  }
}
