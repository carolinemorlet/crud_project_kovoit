import { Module } from '@nestjs/common';
import { LibraryTestService } from './library-test.service';

@Module({
  providers: [LibraryTestService],
  exports: [LibraryTestService],
})
export class LibraryTestModule {}
