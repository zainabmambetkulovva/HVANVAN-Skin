import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  fulfillmentType?: string;

  @IsOptional()
  @IsNumber()
  deliveryAmount?: number;

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
