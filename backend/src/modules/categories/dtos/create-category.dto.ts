import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsString()
  parentId?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsString()
  description?: string;

  @IsString()
  imageUrl?: string;

  @IsNumber()
  sortOrder?: number;

  @IsBoolean()
  isActive?: boolean;
}
