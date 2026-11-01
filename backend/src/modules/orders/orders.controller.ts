import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Pagination } from '@common/decorators/pagination.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto, @GetUser('id') userId: string) {
    return this.ordersService.create(userId, dto);
  }

  @Get()
  findAll(@Query('status') status?: string, @Pagination() pagination?: any) {
    return this.ordersService.findAll({ status }, pagination);
  }

  @Get('my')
  findMyOrders(@GetUser('id') userId: string, @Pagination() pagination?: any) {
    return this.ordersService.findMyOrders(userId, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
