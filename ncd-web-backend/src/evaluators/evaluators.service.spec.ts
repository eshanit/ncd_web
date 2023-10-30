import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorsService } from './evaluators.service';

describe('EvaluatorsService', () => {
  let service: EvaluatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluatorsService],
    }).compile();

    service = module.get<EvaluatorsService>(EvaluatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
