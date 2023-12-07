import { editGroupDto, groupDto } from './dto/group.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Group, GroupDocument } from './schemas/group.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { KidService } from 'src/kid/kid.service';
import { Kid, KidDocument } from 'src/kid/schemas/kid.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Kid.name) private kidModel: Model<KidDocument>,
    private kidService: KidService,
  ) {}

  async getGroup(): Promise<any> {
    try {
      return await this.groupModel.find().populate('kidId').exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGroupById(groupId: string): Promise<GroupDocument> {
    try {
      const response = await this.groupModel
        .findById(groupId)
        .populate('kidId')
        .exec();
      if (!response) {
        throw new NotFoundException(`Group #${groupId} not found`);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGroupByAssociationId(associationId: string): Promise<any> {
    try {
      const groups = await this.groupModel
        .find({ associationId: associationId })
        .exec();
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createGroup(data: groupDto): Promise<GroupDocument> {
    try {
      const group = new this.groupModel(data);
      await group.save();
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editGroup(
    id: string,
    data: groupDto,
    kidId: string,
  ): Promise<
    { status: string; message: string; error: string } | GroupDocument
  > {
    try {
      const existingChild = await this.kidService.getKidById(kidId);
      if (!existingChild) {
        throw new NotFoundException('Kid not found');
      }

      const existingGroup = await this.groupModel.findById(id);
      if (!existingGroup) {
        throw new Error('group not found');
      }

      existingGroup.kidId.push(existingChild);
      await existingGroup.save();

      const updatedGroup = await this.groupModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedGroup;
    } catch (error) {
      throw error;
    }
  }

  async deleteGroup(id: string): Promise<GroupDocument> {
    try {
      return await this.groupModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGroupWithKids(groupId: string): Promise<GroupDocument> {
    try {
      const group = await this.groupModel
        .findById(groupId)
        .populate('kidId')
        .exec();

      if (!group) {
        throw new NotFoundException(`Group #${groupId} not found`);
      }

      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
}
