import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorsController } from './evaluators.controller';
import { EvaluatorsService } from './evaluators.service';

describe('EvaluatorsController', () => {
  let controller: EvaluatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluatorsController],
      providers: [EvaluatorsService],
    }).compile();

    controller = module.get<EvaluatorsController>(EvaluatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
