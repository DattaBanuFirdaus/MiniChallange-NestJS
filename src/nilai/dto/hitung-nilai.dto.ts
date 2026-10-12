import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class HitungNilaiDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama!: string;

  @IsArray({ message: 'Tugas harus berupa array' })
  @ArrayMinSize(1, {
    message: 'Tugas minimal berisi 1 nilai',
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    {
      each: true,
      message: 'Setiap nilai tugas harus berupa angka',
    },
  )
  @Min(0, {
    each: true,
    message: 'Setiap nilai tugas minimal 0',
  })
  @Max(100, {
    each: true,
    message: 'Setiap nilai tugas maksimal 100',
  })
  tugas!: number[];

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'UTS harus berupa angka' },
  )
  @Min(0, { message: 'UTS minimal 0' })
  @Max(100, { message: 'UTS maksimal 100' })
  uts!: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'UAS harus berupa angka' },
  )
  @Min(0, { message: 'UAS minimal 0' })
  @Max(100, { message: 'UAS maksimal 100' })
  uas!: number;
}