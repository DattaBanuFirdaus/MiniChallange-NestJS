import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { DeretQueryDto } from './dto/deret-query.dto.js';
import { DeretParamsDto } from './dto/deret-params.dto.js';

@Controller('deret')
export class DeretController {
 @Get(':jenis')
buatDeret(
  @Param() params: DeretParamsDto,
  @Query() query: DeretQueryDto,
) {
  const { jenis } = params;
  const { jumlah, urutan } = query;
  

    const data: number[] = [];
    let total = 0;

    // Hitung deret bilangan
    for (let i = 1; i <= jumlah; i++) {
      let nilai = 0;

      switch (jenis) {
        case 'ganjil':
          nilai = 2 * i - 1;
          break;
        case 'genap':
          nilai = 2 * i;
          break;
        case 'kuadrat':
          nilai = i * i;
          break;
      }

      data.push(nilai);
      total += nilai;
    }

    // Membalik urutan jika urutan=desc
    if (urutan === 'desc') {
      data.reverse();
    }

    return {
      jenis: jenis,
      jumlah: jumlah,
      data: data,
      total: total,
    };
  }
}