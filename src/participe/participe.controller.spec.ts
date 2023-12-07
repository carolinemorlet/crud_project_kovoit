import { Test, TestingModule } from '@nestjs/testing';
import { ParticipeController } from './participe.controller';

describe('ParticipeController', () => {
  let controller: ParticipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipeController],
    }).compile();

    controller = module.get<ParticipeController>(ParticipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
