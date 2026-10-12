import { Controller, Get, Param } from '@nestjs/common';
import { ConvertService } from './convert.service.js';
import { convertMeterdto } from './dto/convert-meters-dto.js';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Get("/length/:meters")
  convertLength(@Param('meters') param : convertMeterdto) {
   return this.convertService.convertMeters(param);
  }
}
