import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  discountType: string;

  @IsNumber()
  discountValue: number;

  @IsNotEmpty()
  startsAt: Date;

  @IsNotEmpty()
  endsAt: Date;

  @IsBoolean()
  isActive?: boolean;
}
