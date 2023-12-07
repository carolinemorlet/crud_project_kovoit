import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDocument } from './schemas/group.schema';
import { editGroupDto, groupDto } from './dto/group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/')
  async getAll(): Promise<any> {
    try {
      return await this.groupService.getGroup();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:id')
  async getGroup(@Param('id') groupId: string) {
    try {
      const existingGroup = await this.groupService.getGroupById(groupId);
      return existingGroup;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/association/:id')
  async getGroupByAssociationId(
    @Param('id') associationId: string,
  ): Promise<any> {
    try {
      const groups = await this.groupService.getGroupByAssociationId(
        associationId,
      );
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  async create(@Body() data: groupDto): Promise<GroupDocument> {
    try {
      return await this.groupService.createGroup(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body() groupDto: editGroupDto,
    @Body('kidId') kidId: string,
  ) {
    try {
      const updatedGroup = await this.groupService.editGroup(
        id,
        groupDto,
        kidId,
      );
      return { status: 'success', datas: updatedGroup };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: 'Kid not found',
          error: error.message,
        };
      }
      throw error;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<GroupDocument> {
    try {
      return await this.groupService.deleteGroup(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
