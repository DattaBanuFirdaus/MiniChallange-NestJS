import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { BilanganParamsDto } from './dto/bilangan-params.dto.js';

@Controller('bilangan')
export class BilanganController {
 @Get(':angka')
cekBilangan(@Param() params: BilanganParamsDto) {
  const angka = params.angka;


    if (Number.isNaN(angka) || !Number.isInteger(angka) || angka < 1 || angka > 100) {
       throw new BadRequestException ('angka harus berupa bilangan bulat antara 1 hingga 100');
    }
    
    const jenis = angka % 2 === 0 ? 'genap' : 'ganjil';

    const kuadrat = angka * angka;

    const kelipatanlima = angka % 5 === 0;

    return {
      angka,
      jenis,
      kuadrat,
      kelipatanlima
    };

  }
}
