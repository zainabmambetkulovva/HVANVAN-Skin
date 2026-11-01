import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateAuditLogDto } from './dtos/create-audit-log.dto';
import { Pagination } from '@common/decorators/pagination.decorator';

@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  findAll(@Query('userId') userId?: string, @Query('entityType') entityType?: string, @Pagination() pagination?: any) {
    return this.auditService.findAll({ userId, entityType }, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAuditLogDto) {
    return this.auditService.create(dto);
  }
}
