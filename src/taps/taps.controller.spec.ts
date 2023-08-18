import { Test, TestingModule } from '@nestjs/testing';
import { TapsController } from './taps.controller';

describe('TapsController', () => {
  let controller: TapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TapsController],
    }).compile();

    controller = module.get<TapsController>(TapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
