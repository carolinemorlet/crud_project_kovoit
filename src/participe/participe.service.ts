import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participe, ParticipeDocument } from './schemas/participe.schema';
import { Model } from 'mongoose';
import {
  Relation,
  RelationDocument,
} from 'src/relation/schemas/relation.schema';
import { CreateParticipeDto, updateParticipeDto } from './dto/participe.dto';
import { EventCollection, EventDocument } from 'src/event/schemas/event.schema';
import { Kid, KidDocument } from 'src/kid/schemas/kid.schema';
import {
  Carshare,
  CarshareDocument,
} from 'src/carshare/schemas/carshare.schema';

@Injectable()
export class ParticipeService {
  constructor(
    @InjectModel(Participe.name)
    private participeModel: Model<ParticipeDocument>,
    @InjectModel(EventCollection.name)
    private eventModel: Model<EventDocument>,
    @InjectModel(Kid.name)
    private kidModel: Model<KidDocument>,
    @InjectModel(Relation.name)
    private relationModel: Model<RelationDocument>,
    @InjectModel(Carshare.name)
    private carshareModel: Model<CarshareDocument>,
  ) {}

  async createParticipe(data: CreateParticipeDto): Promise<ParticipeDocument> {
    try {
      if ((await this.eventModel.countDocuments({ _id: data.eventId })) == 0)
        throw new Error('eventID not found');
      if ((await this.kidModel.countDocuments({ _id: data.kidId })) == 0)
        throw new Error('kidID not found');
      if (
        data.carshareId != null &&
        (await this.carshareModel.countDocuments({ _id: data.carshareId })) == 0
      )
        throw new Error('carshareId not found');
      if (
        (await this.participeModel.countDocuments({
          eventId: data.eventId,
          kidId: data.kidId,
        })) != 0
      )
        throw new Error('participation already registered');
      const participe = new this.participeModel(data);
      await participe.save();
      return participe;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateParticipe(
    id: string,
    data: updateParticipeDto,
  ): Promise<ParticipeDocument> {
    try {
      if ((await this.participeModel.countDocuments({ _id: id })) == 0)
        throw new Error('participeID not found');
      if (
        data.carshareId != null &&
        (await this.carshareModel.countDocuments({ _id: data.carshareId })) == 0
      )
        throw new Error('carshareId not found');
      return await this.participeModel.findByIdAndUpdate(
        { _id: id },
        { carshareId: data.carshareId },
        { new: true },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteParticipe(id: string) {
    try {
      if ((await this.participeModel.countDocuments({ _id: id })) == 0)
        throw new Error('participeID not found');
      return await this.participeModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParticipeByEventInterKid(
    eventId: string,
    kidId: string,
  ): Promise<ParticipeDocument> {
    try {
      if ((await this.eventModel.countDocuments({ _id: eventId })) == 0)
        throw new Error('eventID not found');
      if ((await this.kidModel.countDocuments({ _id: kidId })) == 0)
        throw new Error('kidID not found');
      return await this.participeModel.findOne({
        eventId: eventId,
        kidId: kidId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParticipeByEvent(eventId: string): Promise<ParticipeDocument[]> {
    try {
      if ((await this.eventModel.countDocuments({ _id: eventId })) == 0)
        throw new Error('eventID not found');
      return await this.participeModel.find({ eventId: eventId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async countParticipeByEvent(eventId: string): Promise<number> {
    try {
      if ((await this.eventModel.countDocuments({ _id: eventId })) == 0)
        throw new Error('eventID not found');
      return await this.participeModel.countDocuments({ eventId: eventId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async countUnassignedParticipeByEvent(eventId: string): Promise<number> {
    try {
      if ((await this.eventModel.countDocuments({ _id: eventId })) == 0)
        throw new Error('eventID not found');
      return await this.participeModel.countDocuments({
        eventId: eventId,
        carshareId: null,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // async getParticipantdChildsByUser(user_id:string, event_id:string){
  //     try{
  //         const relations:RelationDocument[] = await this.relationModel.find({user_id}).select("kid_id");
  //         console.log("🚀 ~ file: event.service.ts:66 ~ EventService ~ getRegisteredChildByUser ~ relations:", relations)
  //         const participations:ParticipeDocument[] = await this.participeModel.find({event_id}).select("kid_id");
  //         const relationsChild:string[];
  //         const participationsChild:string[];
  //         relations.forEach(element => {
  //             // relationsChild.push(element.);
  //         });
  //     }catch(e){}
  // }
}
