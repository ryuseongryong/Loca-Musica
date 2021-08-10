import { Test, TestingModule } from '@nestjs/testing';
import { MusicalService } from './musical.service';

describe('MusicalService', () => {
  let service: MusicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicalService],
    }).compile();

    service = module.get<MusicalService>(MusicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
