import { Module } from '@nestjs/common';
import { KasirController } from './kasir.controller.js';

@Module({
  controllers: [KasirController],
})
export class KasirModule {}