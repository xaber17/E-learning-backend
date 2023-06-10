import { Test, TestingModule } from '@nestjs/testing';
import { KelasController } from './materi.controller';
import { KelasService } from './materi.service';

describe('KelasController', () => {
  let controller: KelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KelasController],
      providers: [KelasService],
    }).compile();

    controller = module.get<KelasController>(KelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
