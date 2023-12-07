import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      if (
        (await this.userModel.countDocuments({ email: createUserDto.email })) !=
        0
      )
        throw new Error('email already taken');
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<UserDocument> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<UserDocument> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
