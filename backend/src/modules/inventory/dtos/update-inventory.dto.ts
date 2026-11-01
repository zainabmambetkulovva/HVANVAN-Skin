import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateInventoryDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  minQuantity?: number;
}
