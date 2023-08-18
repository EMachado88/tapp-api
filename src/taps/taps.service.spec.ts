import { Test, TestingModule } from '@nestjs/testing';
import { TapsService } from './taps.service';

describe('TapsService', () => {
  let service: TapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TapsService],
    }).compile();

    service = module.get<TapsService>(TapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
