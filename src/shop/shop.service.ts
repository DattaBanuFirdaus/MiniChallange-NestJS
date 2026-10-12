import { Injectable } from '@nestjs/common';
import { DiscountDto } from './dto/discount.dto.js';

@Injectable()
export class ShopService {
    countDiscount(dto: DiscountDto) {
        const harga = dto.harga
        const diskon = dto.diskon
        const finalPrice = (100 - diskon) * harga / 100;
        return {
            message: "harga akhir telah dihitung",
            finalPrice: finalPrice
        }
    }
}