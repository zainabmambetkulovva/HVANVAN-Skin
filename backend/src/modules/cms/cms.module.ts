import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CMSController } from './cms.controller';
import { CMSService } from './cms.service';

@Module({
  controllers: [CMSController],
  providers: [CMSService, PrismaService],
  exports: [CMSService],
})
export class CMSModule {}
