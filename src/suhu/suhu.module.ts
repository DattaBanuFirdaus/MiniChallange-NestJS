import { Module } from '@nestjs/common';
import { SuhuController } from './suhu.controller.js';

@Module({
  controllers: [SuhuController],
})
export class SuhuModule {}