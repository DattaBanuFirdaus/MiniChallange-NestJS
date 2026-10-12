import { IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";

export class GradeDto {
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    @Max(100)
  nilai : number;
}