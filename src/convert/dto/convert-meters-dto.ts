import { IsNotEmpty, IsNumber,  Max,  Min  } from "class-validator";

export class convertMeterdto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000000)
  meters: number;
}