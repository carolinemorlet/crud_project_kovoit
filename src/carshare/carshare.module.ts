import { Module } from '@nestjs/common';
import { CarshareController } from './carshare.controller';
import { CarshareService } from './carshare.service';

@Module({
  controllers: [CarshareController],
  providers: [CarshareService],
})
export class CarshareModule {}
