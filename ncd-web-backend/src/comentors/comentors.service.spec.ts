import { Test, TestingModule } from '@nestjs/testing';
import { ComentorsService } from './comentors.service';

describe('ComentorsService', () => {
  let service: ComentorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentorsService],
    }).compile();

    service = module.get<ComentorsService>(ComentorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
