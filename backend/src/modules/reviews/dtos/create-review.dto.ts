import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNumber()
  rating: number;

  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  images?: string;
}
