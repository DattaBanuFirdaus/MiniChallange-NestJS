import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SuhuQueryDto } from './dto/suhu-query.dto.js';

@Controller('suhu')
export class SuhuController {
  @Get('konversi')
  konversiSuhu(@Query() query: SuhuQueryDto) {
    // Mengambil data yang sudah divalidasi DTO
    const { nilai, dari, ke } = query;

   // Langkah 1: Ubah suhu asal menjadi Celsius
let celsius: number;

switch (dari) {
  case 'celsius':
    celsius = nilai;
    break;

  case 'fahrenheit':
    celsius = (nilai - 32) * (5 / 9);
    break;

  case 'kelvin':
    celsius = nilai - 273.15;
    break;

  default:
    throw new BadRequestException(
      'Satuan asal tidak valid',
    );
}

   // Langkah 2: Ubah Celsius ke satuan tujuan
let hasil: number;

switch (ke) {
  case 'celsius':
    hasil = celsius;
    break;

  case 'fahrenheit':
    hasil = celsius * (9 / 5) + 32;
    break;

  case 'kelvin':
    hasil = celsius + 273.15;
    break;

  default:
    throw new BadRequestException(
      'Satuan tujuan tidak valid',
    );
}

    // Membulatkan hasil menjadi maksimal 2 desimal
    hasil = Math.round((hasil! + Number.EPSILON) * 100) / 100;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil,
      satuanHasil: ke,
    };
  }
}