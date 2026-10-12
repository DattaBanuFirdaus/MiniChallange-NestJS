import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CheckoutItemDto } from './checkout-item.dto.js';

export class CheckoutBodyDto {
  @IsArray({ message: 'Items harus berupa array' })
  @ArrayMinSize(1, {
    message: 'Items tidak boleh kosong',
  })
  @ArrayMaxSize(10, {
    message: 'Items maksimal 10 item',
  })
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[];
}
