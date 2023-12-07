import { Test, TestingModule } from '@nestjs/testing';
import { CarshareController } from './carshare.controller';

describe('CarshareController', () => {
  let controller: CarshareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarshareController],
    }).compile();

    controller = module.get<CarshareController>(CarshareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
