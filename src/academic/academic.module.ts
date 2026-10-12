import { Module } from '@nestjs/common';
import { AcademicService } from './academic.service.js';
import { AcademicController } from './academic.controller.js';

@Module({
  controllers: [AcademicController],
  providers: [AcademicService],
})
export class AcademicModule {}
