import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDocument } from './schemas/event.schema';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  async getAll(): Promise<EventDocument[]> {
    try {
      return await this.eventService.getAllEvent();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:id')
  async getEventById(@Param('id') eventId: string) {
    try {
      const existingEvent = await this.eventService.getEventById(eventId);
      return existingEvent;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  async create(@Body() data: CreateEventDto): Promise<EventDocument> {
    try {
      return await this.eventService.createEvent(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateEventDto,
  ): Promise<EventDocument> {
    try {
      return await this.eventService.updateEvent(id, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<EventDocument> {
    try {
      return await this.eventService.deleteEvent(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/group/:id')
  async getEventsByGroupId(@Param('id') groupId: string): Promise<any> {
    try {
      const events = await this.eventService.getEventsByGroupId(groupId);
      return events;
    } catch (error) {
      throw new Error(error);
    }
  }
}
