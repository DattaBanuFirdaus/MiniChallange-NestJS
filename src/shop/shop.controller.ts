import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service.js';
import { DiscountDto } from './dto/discount.dto.js';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

 @Post('/discount')
  countDiscount(@Body() dto: DiscountDto) {
    return this.shopService.countDiscount(dto);
  }
}
