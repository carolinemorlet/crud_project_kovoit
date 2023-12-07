import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenDocument } from './schemas/token.schema';
import { CreateTokenDto } from './dto/token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/')
  async create(@Body() data: CreateTokenDto): Promise<TokenDocument> {
    try {
      return await this.tokenService.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/')
  async findAll() {
    try {
      return await this.tokenService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.tokenService.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateTokenDto) {
    try {
      return this.tokenService.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.tokenService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
