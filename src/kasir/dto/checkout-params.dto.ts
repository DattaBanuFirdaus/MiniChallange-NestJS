import { Transform } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class CheckoutParamsDto {
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toLowerCase()
      : value,
  )
  @IsString({ message: 'Member harus berupa teks' })
  @IsIn(['reguler', 'silver', 'gold'], {
    message: 'Member harus reguler, silver, atau gold',
  })
  member!: string;
}