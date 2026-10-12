import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Query,
} from '@nestjs/common';

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

@Controller('kasir')
export class KasirController {
  @Post('checkout/:member')
  checkout(
    @Param('member') member: string,
    @Query('metode') metode: string | undefined,
    @Body() body: unknown,
  ) {
    // 1. Validasi member
    if (!['reguler', 'silver', 'gold'].includes(member)) {
      throw new BadRequestException(
        'Member hanya boleh reguler, silver, atau gold',
      );
    }

    // 2. Validasi metode pembayaran
    if (metode !== 'tunai' && metode !== 'qris') {
      throw new BadRequestException(
        'Metode wajib diisi dan hanya boleh tunai atau qris',
      );
    }

    // 3. Validasi body dan items
    if (!isRecord(body)) {
      throw new BadRequestException(
        'Body harus berupa object JSON',
      );
    }

    const itemsInput = body.items;

    if (!Array.isArray(itemsInput)) {
      throw new BadRequestException(
        'Items harus berupa array',
      );
    }

    if (itemsInput.length === 0) {
      throw new BadRequestException(
        'Items tidak boleh kosong',
      );
    }

    if (itemsInput.length > 10) {
      throw new BadRequestException(
        'Items maksimal 10 item',
      );
    }

    // 4. Validasi setiap item dan hitung subtotal item
    const items = itemsInput as unknown[];

    const rincian = items.map((item, index) => {
      const urutan = index + 1;

      if (!isRecord(item)) {
        throw new BadRequestException(
          `Item ke-${urutan}: harus berupa object`,
        );
      }

      const nama = item.nama;
      const harga = item.harga;
      const qty = item.qty;

      if (
        typeof nama !== 'string' ||
        nama.trim() === ''
      ) {
        throw new BadRequestException(
          `Item ke-${urutan}: nama harus berupa string tidak kosong`,
        );
      }

      if (
        typeof harga !== 'number' ||
        !Number.isFinite(harga) ||
        harga <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${urutan}: harga harus berupa angka lebih dari 0`,
        );
      }

      if (
        typeof qty !== 'number' ||
        !Number.isInteger(qty) ||
        qty <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${urutan}: qty harus bilangan bulat lebih dari 0`,
        );
      }

      return {
        nama: nama.trim(),
        harga,
        qty,
        subtotal: round2(harga * qty),
      };
    });

    // 5. Hitung total jumlah barang dan subtotal belanja
    const totalItem = rincian.reduce(
      (total, item) => total + item.qty,
      0,
    );

    const subtotal = round2(
      rincian.reduce(
        (total, item) => total + item.subtotal,
        0,
      ),
    );

    // 6. Hitung diskon member
    let persenDiskon = 0;

    if (member === 'silver') {
      persenDiskon = 5;
    } else if (member === 'gold') {
      persenDiskon = 10;
    }

    const diskon = round2(
      subtotal * persenDiskon / 100,
    );

    // 7. Hitung biaya admin
    const setelahDiskon = round2(subtotal - diskon);

    const biayaAdmin =
      metode === 'qris'
        ? round2(setelahDiskon * 1 / 100)
        : 0;

    // 8. Hitung total pembayaran
    const total = round2(
      setelahDiskon + biayaAdmin,
    );

    // 9. Kembalikan hasil dalam JSON
    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal,
      diskon,
      biayaAdmin,
      total,
    };
  }
}