import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { InventoryTransactionDto } from './dtos/inventory-transaction.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAll(@Query('productId') productId?: string, @Query('branchId') branchId?: string) {
    return this.inventoryService.findAll({ productId, branchId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoryService.update(id, dto);
  }

  @Post('transaction')
  createTransaction(@Body() dto: InventoryTransactionDto) {
    return this.inventoryService.createTransaction(dto);
  }
}
