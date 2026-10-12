import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class DeretQueryDto {
  @Type(() => Number)
  @IsInt({ message: 'Jumlah harus berupa bilangan bulat' })
  @Min(1, { message: 'Jumlah minimal 1' })
  @Max(20, { message: 'Jumlah maksimal 20' })
  jumlah!: number;

  // Untuk tantangan opsional di PDF.
  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: 'Urutan hanya boleh asc atau desc',
  })
  urutan?: string;
}