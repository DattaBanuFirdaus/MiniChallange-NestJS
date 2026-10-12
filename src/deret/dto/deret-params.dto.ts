import { IsIn } from 'class-validator';

export class DeretParamsDto {
  @IsIn(['ganjil', 'genap', 'kuadrat'], {
    message: 'Jenis harus ganjil, genap, atau kuadrat',
  })
  jenis!: string;
}