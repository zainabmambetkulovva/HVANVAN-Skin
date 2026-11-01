import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { UDSController } from './uds.controller';
import { UDSService } from './uds.service';

@Module({
  controllers: [UDSController],
  providers: [UDSService, PrismaService],
  exports: [UDSService],
})
export class UDSModule {}
