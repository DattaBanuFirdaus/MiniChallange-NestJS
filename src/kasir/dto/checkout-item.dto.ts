import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CheckoutItemDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'nama harus berupa teks' })
  @IsNotEmpty({ message: 'nama tidak boleh kosong' })
  nama!: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'harga harus berupa angka lebih dari 0' },
  )
  @IsPositive({
    message: 'harga harus berupa angka lebih dari 0',
  })
  harga!: number;

  @IsInt({
    message: 'qty harus bilangan bulat lebih dari 0',
  })
  @IsPositive({
    message: 'qty harus bilangan bulat lebih dari 0',
  })
  qty!: number;
}