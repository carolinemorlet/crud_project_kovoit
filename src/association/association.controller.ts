import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AssociationService } from './association.service';
import {
  AssociationDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from './dto/association.dto';
import { AssociationDocument } from './schemas/association.schema';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get('/')
  async getAll(): Promise<AssociationDocument[]> {
    try {
      return await this.associationService.getAllAssociation();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('/:id')
  async getAssociationById(@Param('id') associationId: string) {
    try {
      const existingAssociation =
        await this.associationService.getAssociationById(associationId);
      return existingAssociation;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  async create(
    @Body() data: CreateAssociationDto,
  ): Promise<AssociationDocument> {
    try {
      return await this.associationService.createAssociation(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAssociationDto,
  ): Promise<AssociationDocument> {
    try {
      return await this.associationService.updateAssociation(id, data);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<AssociationDocument> {
    try {
      return await this.associationService.deleteAssociation(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('/user/:id')
  async getAssociationByUserId(@Param('id') userId: string): Promise<any> {
    try {
      const associations = await this.associationService.getAssociationByUserId(
        userId,
      );
      return associations;
    } catch (error) {
      throw new Error(error);
    }
  }
}
