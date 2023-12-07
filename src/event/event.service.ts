import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventCollection, EventDocument } from './schemas/event.schema';
import {
  Association,
  AssociationDocument,
} from 'src/association/schemas/association.schema';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import {
  Participe,
  ParticipeDocument,
} from 'src/participe/schemas/participe.schema';
import {
  Relation,
  RelationDocument,
} from 'src/relation/schemas/relation.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventCollection.name)
    private eventModel: Model<EventDocument>,
    @InjectModel(Association.name)
    private associationModel: Model<AssociationDocument>,
  ) {}

  async getAllEvent() {
    try {
      return await this.eventModel.find().populate('groupId').exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEventById(eventId: string): Promise<EventDocument> {
    try {
      const response = await this.eventModel
        .findById(eventId)
        .populate('groupId')
        .exec();
      if (!response) {
        throw new NotFoundException(`Event #${eventId} not found`);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createEvent(data: CreateEventDto): Promise<EventDocument> {
    try {
      // if (
      //   (await this.associationModel.countDocuments({
      //     _id: data.associationId,
      //   })) == 0
      // )
      //   throw new Error('assoID not found');
      const event = new this.eventModel(data);
      await event.save();
      return event;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEvent(id: string, data: UpdateEventDto): Promise<EventDocument> {
    try {
      if ((await this.eventModel.countDocuments({ _id: id })) == 0)
        throw new Error('event not found');
      return await this.eventModel.findByIdAndUpdate(
        { _id: id },
        { ...data },
        { new: true },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEvent(id: string) {
    try {
      if ((await this.eventModel.countDocuments({ _id: id })) == 0)
        throw new Error('event not found');
      return await this.eventModel.findOneAndDelete({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getEventsByGroupId(groupId: string): Promise<any> {
    try {
      const events = await this.eventModel.find({ groupId: groupId });
      return events;
    } catch (error) {
      throw new Error(error);
    }
  }
}
