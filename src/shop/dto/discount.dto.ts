import { IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";

export class DiscountDto {
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
  harga : number;

    @IsNotEmpty()
    @IsPositive()
    @Max(100)
    diskon : number;
}
