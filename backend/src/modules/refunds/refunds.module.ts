import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { RefundsController } from './refunds.controller';
import { RefundsService } from './refunds.service';

@Module({
  controllers: [RefundsController],
  providers: [RefundsService, PrismaService],
  exports: [RefundsService],
})
export class RefundsModule {}
