import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KidService } from './kid.service';
import { KidDocument } from './schemas/kid.schema';
import { kidDto } from './dto/kid.dto';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/email/dto/email.dto';

@Controller('kid')
export class KidController {
  constructor(
    private readonly kidService: KidService,
    private readonly emailService: EmailService,
  ) {}

  @Get('/')
  async getAll(): Promise<any> {
    try {
      return await this.kidService.getAllKid();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:id')
  async getKid(@Param('id') kidId: string) {
    try {
      const existingKid = await this.kidService.getKidById(kidId);
      return existingKid;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  async create(@Body() data: kidDto): Promise<KidDocument> {
    try {
      const newKid = await this.kidService.createKid(data);

      if (!newKid) {
        throw new Error('Error create child');
      }

      const emailData: EmailDto = {
        subject: `Votre enfant a été ajouté à l'association`,
        sender: { email: `kovoit@gmail.com`, name: `Kovoit` },
        to: [
          {
            email: data.email,
            name: data.firstname,
          },
        ],
        params: {
          name: data.firstname,
        },
        templateId: 3,
      };

      const response = await this.emailService.sendEmail(emailData);
      console.log('success send email', response);

      return newKid;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() data: kidDto,
  ): Promise<KidDocument> {
    try {
      return await this.kidService.editKid(id, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<KidDocument> {
    try {
      return await this.kidService.deleteKid(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
