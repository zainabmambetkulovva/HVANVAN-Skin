import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  notificationType?: string;

  @IsOptional()
  @IsString()
  relatedOrderId?: string;
}
