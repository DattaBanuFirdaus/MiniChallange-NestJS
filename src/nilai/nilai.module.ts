import { Module } from '@nestjs/common';
import { NilaiController } from './nilai.controller.js';

@Module({
  controllers: [NilaiController],
})
export class NilaiModule {}