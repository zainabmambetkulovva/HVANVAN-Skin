import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreatePromoCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  promotionId?: string;

  @IsNotEmpty()
  @IsString()
  discountType: string;

  @IsNumber()
  discountValue: number;

  @IsOptional()
  @IsNumber()
  minOrderAmount?: number;

  @IsOptional()
  @IsNumber()
  maxUses?: number;

  @IsOptional()
  startsAt?: Date;

  @IsOptional()
  endsAt?: Date;

  @IsBoolean()
  isActive?: boolean;
}
