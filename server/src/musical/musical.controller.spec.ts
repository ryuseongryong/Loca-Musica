import { Test, TestingModule } from '@nestjs/testing';
import { MusicalController } from './musical.controller';

describe('MusicalController', () => {
  let controller: MusicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicalController],
    }).compile();

    controller = module.get<MusicalController>(MusicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
