import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  subtitle?: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsString()
  mobileImageUrl?: string;

  @IsString()
  linkUrl?: string;

  @IsNumber()
  position?: number;

  startsAt?: Date;

  endsAt?: Date;

  @IsBoolean()
  isActive?: boolean;
}
