import { Test, TestingModule } from '@nestjs/testing';
import { LibraryTestService } from './library-test.service';

describe('LibraryTestService', () => {
  let service: LibraryTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryTestService],
    }).compile();

    service = module.get<LibraryTestService>(LibraryTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
