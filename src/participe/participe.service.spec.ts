import { Test, TestingModule } from '@nestjs/testing';
import { ParticipeService } from './participe.service';

describe('ParticipeService', () => {
  let service: ParticipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipeService],
    }).compile();

    service = module.get<ParticipeService>(ParticipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
