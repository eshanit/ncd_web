import { Test, TestingModule } from '@nestjs/testing';
import { ComentorsController } from './comentors.controller';
import { ComentorsService } from './comentors.service';

describe('ComentorsController', () => {
  let controller: ComentorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentorsController],
      providers: [ComentorsService],
    }).compile();

    controller = module.get<ComentorsController>(ComentorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
