import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { HitungNilaiDto } from './dto/hitung-nilai.dto.js';

@Controller('nilai')
export class NilaiController {
 @Post('hitung')
@HttpCode(200)
hitungNilai(@Body() dto: HitungNilaiDto) {
  const { nama, tugas, uts, uas } = dto;
    // --- PROSES PERHITUNGAN ---

    // Menghitung rata-rata nilai tugas
    const totalTugas = tugas.reduce((acc, curr) => acc + curr, 0);
    let rataTugas = totalTugas / tugas.length;
    rataTugas = Math.round(rataTugas * 100) / 100;

    // Menghitung nilai akhir (Tugas 30%, UTS 30%, UAS 40%)
    let nilaiAkhir = rataTugas * 0.3 + uts * 0.3 + uas * 0.4;
    nilaiAkhir = Math.round(nilaiAkhir * 100) / 100;

    // Menentukan predikat
    let predikat: string;
    if (nilaiAkhir >= 90) {
      predikat = 'A';
    } else if (nilaiAkhir >= 80) {
      predikat = 'B';
    } else if (nilaiAkhir >= 70) {
      predikat = 'C';
    } else {
      predikat = 'D';
    }

    // Menentukan status kelulusan
    const status = nilaiAkhir >= 75 ? 'Lulus' : 'Remedial';

    // Mengembalikan response JSON
    return {
      nama: nama.trim(),
      rataTugas: rataTugas,
      nilaiAkhir: nilaiAkhir,
      predikat: predikat,
      status: status,
    };
  }
}