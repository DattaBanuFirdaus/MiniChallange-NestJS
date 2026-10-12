import { Body, Controller, Post } from '@nestjs/common';
import { AcademicService } from './academic.service.js';
import { GradeDto } from './dto/grade.dto.js';

@Controller('academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

@Post('/grade')
  countGrade(@Body() dto: GradeDto) {
    return this.academicService.countGrade(dto);
  }
}

