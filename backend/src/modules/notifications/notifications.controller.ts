import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { SendNotificationDto } from './dtos/send-notification.dto';
import { Pagination } from '@common/decorators/pagination.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post()
  send(@Body() dto: SendNotificationDto) {
    return this.notificationsService.send(dto);
  }

  @Get()
  findAll(@GetUser('id') userId: string, @Pagination() pagination?: any) {
    return this.notificationsService.findAll(userId, pagination);
  }

  @Get('unread')
  findUnread(@GetUser('id') userId: string) {
    return this.notificationsService.findUnread(userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
