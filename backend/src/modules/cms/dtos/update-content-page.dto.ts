import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateContentPageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsBoolean()
  isPublished?: boolean;
}
