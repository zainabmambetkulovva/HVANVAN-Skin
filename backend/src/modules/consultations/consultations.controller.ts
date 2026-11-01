import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateConsultationDto } from './dtos/create-consultation.dto';
import { Pagination } from '@common/decorators/pagination.decorator';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class ConsultationsController {
  constructor(private consultationsService: ConsultationsService) {}

  @Post()
  create(@Body() dto: CreateConsultationDto) {
    return this.consultationsService.create(dto);
  }

  @Get()
  findAll(@Pagination() pagination?: any) {
    return this.consultationsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.consultationsService.updateStatus(id, status);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body('assignedToId') assignedToId: string) {
    return this.consultationsService.assign(id, assignedToId);
  }
}
