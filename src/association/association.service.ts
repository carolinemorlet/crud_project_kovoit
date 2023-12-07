import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Association, AssociationDocument } from './schemas/association.schema';
import { Model } from 'mongoose';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
  AssociationDto,
} from './dto/association.dto';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association.name)
    private associationModel: Model<AssociationDocument>,
  ) {}

  async getAllAssociation(): Promise<AssociationDocument[]> {
    try {
      return await this.associationModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAssociationById(
    associationId: string,
  ): Promise<AssociationDocument> {
    try {
      const response = await this.associationModel.findById(associationId);

      if (!response) {
        throw new NotFoundException(`Association #${associationId} not found`);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createAssociation(
    data: CreateAssociationDto,
  ): Promise<AssociationDocument> {
    try {
      if (
        (await this.associationModel.countDocuments({ name: data.name })) != 0
      )
        throw new Error('association name already taken');
      const association = new this.associationModel(data);
      await association.save();
      return association;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAssociation(
    id: string,
    data: UpdateAssociationDto,
  ): Promise<AssociationDocument> {
    try {
      const existingAssociation = await this.associationModel.findById(id);

      if ((await this.associationModel.countDocuments({ _id: id })) == 0)
        throw new Error('assoID not found');

      if (data.name !== existingAssociation.name) {
        const associationAvecMemeNom = await this.associationModel.findOne({
          name: data.name,
        });
        if (associationAvecMemeNom) {
          throw new Error('association name already taken');
        }
      }

      return await this.associationModel.findByIdAndUpdate(
        { _id: id },
        { ...data },
        { new: true },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAssociation(id: string): Promise<AssociationDocument> {
    try {
      if ((await this.associationModel.countDocuments({ _id: id })) == 0)
        throw new Error('association not found');
      return await this.associationModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAssociationByUserId(userId: string): Promise<any> {
    try {
      const associations = await this.associationModel
        .find({ userId: userId })
        .exec();
      return associations;
    } catch (error) {
      throw new Error(error);
    }
  }
}
