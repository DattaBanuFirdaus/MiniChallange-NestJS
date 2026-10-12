import { Test, TestingModule } from '@nestjs/testing';
import { BilanganController } from './bilangan.controller.js';
import { BilanganService } from './bilangan.service.js';

describe('BilanganController', () => {
  let controller: BilanganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BilanganController],
      providers: [BilanganService],
    }).compile();

    controller = module.get<BilanganController>(BilanganController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
