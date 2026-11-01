import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsBoolean()
  isActive?: boolean;
}
