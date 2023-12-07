import { Test, TestingModule } from '@nestjs/testing';
import { KidController } from './kid.controller';

describe('KidController', () => {
  let controller: KidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KidController],
    }).compile();

    controller = module.get<KidController>(KidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
