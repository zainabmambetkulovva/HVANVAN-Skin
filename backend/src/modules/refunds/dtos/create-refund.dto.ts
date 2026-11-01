import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRefundDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
