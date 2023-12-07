import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParticipeService } from './participe.service';
import { CreateParticipeDto, updateParticipeDto } from './dto/participe.dto';
import { ParticipeDocument } from './schemas/participe.schema';

@Controller('participe')
export class ParticipeController {
  constructor(private readonly participeService: ParticipeService) {}

  @Post('/')
  async create(@Body() data: CreateParticipeDto): Promise<ParticipeDocument> {
    try {
      return await this.participeService.createParticipe(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: updateParticipeDto,
  ): Promise<ParticipeDocument> {
    try {
      return await this.participeService.updateParticipe(id, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<ParticipeDocument> {
    try {
      return await this.participeService.deleteParticipe(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/count/:eventId')
  async countByEvent(@Param('eventId') eventId: string): Promise<number> {
    try {
      return await this.participeService.countParticipeByEvent(eventId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/countUnassigned/:eventId')
  async countUnassignedByEvent(
    @Param('eventId') eventId: string,
  ): Promise<number> {
    try {
      return await this.participeService.countUnassignedParticipeByEvent(
        eventId,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:eventId/:kidId')
  async getByEventInterKid(
    @Param('eventId') eventId: string,
    @Param('kidId') kidId: string,
  ): Promise<ParticipeDocument> {
    try {
      return await this.participeService.getParticipeByEventInterKid(
        eventId,
        kidId,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:eventId')
  async getByEvent(
    @Param('eventId') eventId: string,
  ): Promise<ParticipeDocument[]> {
    try {
      return await this.participeService.getParticipeByEvent(eventId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
