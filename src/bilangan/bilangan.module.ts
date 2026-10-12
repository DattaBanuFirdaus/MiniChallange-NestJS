import { Module } from "@nestjs/common";
import { BilanganController } from "./bilangan.controller.js";


@Module({
    controllers: [BilanganController],
})
export class BilanganModule {}