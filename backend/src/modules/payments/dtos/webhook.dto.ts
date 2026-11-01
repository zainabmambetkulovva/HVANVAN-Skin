import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class WebhookDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  @IsString()
  externalEventId: string;

  @IsNotEmpty()
  @IsString()
  eventType: string;

  @IsNotEmpty()
  @IsObject()
  payload: any;
}
