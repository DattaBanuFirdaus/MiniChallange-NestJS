import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConvertModule } from './convert/convert.module.js';
import { BilanganModule } from './bilangan/bilangan.module.js';
import { SuhuModule } from './suhu/suhu.module.js';
import { DeretModule } from './deret/deret.module.js';
import { NilaiModule } from './nilai/nilai.module.js';
import { ShopModule } from './shop/shop.module.js';
import { AcademicModule } from './academic/academic.module.js';
import { KasirModule } from './kasir/kasir.module.js';

@Module({
  imports: [BilanganModule, SuhuModule, DeretModule, NilaiModule, ShopModule, AcademicModule, KasirModule,],
})
export class AppModule {} 



  