import { kidDto } from './dto/kid.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Kid, KidDocument } from './schemas/kid.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class KidService {
  constructor(@InjectModel(Kid.name) private kidModel: Model<KidDocument>) {}

  async getAllKid(): Promise<any> {
    try {
      return await this.kidModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getKidById(kidId: string): Promise<kidDto> {
    try {
      const existingKid = await this.kidModel.findById(kidId);
      if (!existingKid) {
        throw new NotFoundException(`Kid not found`);
      }
      return existingKid;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createKid(data: kidDto): Promise<KidDocument> {
    try {
      const kid = new this.kidModel(data);

      await kid.save();
      return kid;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editKid(id: string, data: kidDto): Promise<KidDocument> {
    try {
      return await this.kidModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteKid(id: string): Promise<KidDocument> {
    try {
      return await this.kidModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
