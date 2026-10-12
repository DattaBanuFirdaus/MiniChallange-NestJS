import { Module } from '@nestjs/common';
import { DeretController } from './deret.controller.js';

@Module({
  controllers: [DeretController],
})
export class DeretModule {}