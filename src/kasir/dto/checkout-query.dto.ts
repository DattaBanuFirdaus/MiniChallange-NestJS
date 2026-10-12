import { IsDefined, IsIn } from 'class-validator';

export class CheckoutQueryDto {
  @IsDefined({ message: 'Query metode wajib diisi' })
  @IsIn(['tunai', 'qris'], {
    message: 'Metode hanya boleh tunai atau qris',
  })
  metode!: string;
}