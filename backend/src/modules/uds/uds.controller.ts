import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UDSService } from './uds.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { GetUser } from '@common/decorators/user.decorator';

@Controller('uds')
@UseGuards(JwtAuthGuard)
export class UDSController {
  constructor(private udsService: UDSService) {}

  @Get('balance')
  getBalance(@GetUser('id') userId: string) {
    return this.udsService.getBalance(userId);
  }

  @Patch('balance/sync')
  syncBalance(@GetUser('id') userId: string) {
    return this.udsService.syncBalance(userId);
  }

  @Patch(':transactionId/complete')
  completeTransaction(@Param('transactionId') transactionId: string, @Body('status') status: string) {
    return this.udsService.completeTransaction(transactionId, status);
  }
}
