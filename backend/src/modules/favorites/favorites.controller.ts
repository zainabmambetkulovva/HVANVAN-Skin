import { Controller, Get, Post, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { Pagination } from '@common/decorators/pagination.decorator';
import { GetUser } from '@common/decorators/user.decorator';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  add(@Body('productId') productId: string, @GetUser('id') userId: string) {
    return this.favoritesService.add(userId, productId);
  }

  @Get()
  findAll(@GetUser('id') userId: string, @Pagination() pagination?: any) {
    return this.favoritesService.findAll(userId, pagination);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
