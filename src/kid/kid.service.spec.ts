import { Test, TestingModule } from '@nestjs/testing';
import { KidService } from './kid.service';

describe('KidService', () => {
  let service: KidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KidService],
    }).compile();

    service = module.get<KidService>(KidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
