import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { CreateTokenDto } from './dto/token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<TokenDocument> {
    try {
      const createdToken = await new this.tokenModel(createTokenDto);
      return createdToken.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<TokenDocument[]> {
    try {
      return await this.tokenModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(userId: string): Promise<TokenDocument> {
    try {
      return await this.tokenModel.findById(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    userId: string,
    updateTokenDto: CreateTokenDto,
  ): Promise<TokenDocument> {
    try {
      return await this.tokenModel.findByIdAndUpdate(userId, updateTokenDto, {
        new: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(userId: string): Promise<TokenDocument> {
    try {
      return await this.tokenModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
