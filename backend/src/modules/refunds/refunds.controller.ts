import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateRefundDto } from './dtos/create-refund.dto';

@Controller('refunds')
@UseGuards(JwtAuthGuard)
export class RefundsController {
  constructor(private refundsService: RefundsService) {}

  @Post()
  create(@Body() dto: CreateRefundDto) {
    return this.refundsService.create(dto);
  }

  @Get()
  findAll() {
    return this.refundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refundsService.findOne(id);
  }
}
