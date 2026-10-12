import { Test, TestingModule } from '@nestjs/testing';
import { BilanganService } from './bilangan.service.js';

describe('BilanganService', () => {
  let service: BilanganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BilanganService],
    }).compile();

    service = module.get<BilanganService>(BilanganService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
