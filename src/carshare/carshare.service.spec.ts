import { Test, TestingModule } from '@nestjs/testing';
import { CarshareService } from './carshare.service';

describe('CarshareService', () => {
  let service: CarshareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarshareService],
    }).compile();

    service = module.get<CarshareService>(CarshareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
