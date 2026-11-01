import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('sales')
  getSalesByPeriod(@Query('period') period?: string) {
    return this.analyticsService.getSalesByPeriod(period);
  }

  @Get('top-products')
  getTopProducts(@Query('limit') limit?: number) {
    return this.analyticsService.getTopProducts(limit);
  }

  @Get('by-branch')
  getSalesByBranch() {
    return this.analyticsService.getSalesByBranch();
  }
}
