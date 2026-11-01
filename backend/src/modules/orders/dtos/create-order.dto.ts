import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @IsNotEmpty()
  @IsString()
  fulfillmentType: string;

  @IsNumber()
  subtotal: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  deliveryAmount?: number;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsString()
  promoCodeId?: string;

  @IsOptional()
  @IsString()
  customerComment?: string;

  @IsOptional()
  @IsString()
  managerId?: string;
}
