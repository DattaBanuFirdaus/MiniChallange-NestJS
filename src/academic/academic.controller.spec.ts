import { Test, TestingModule } from '@nestjs/testing';
import { AcademicController } from './academic.controller.js';
import { AcademicService } from './academic.service.js';

describe('AcademicController', () => {
  let controller: AcademicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicController],
      providers: [AcademicService],
    }).compile();

    controller = module.get<AcademicController>(AcademicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
