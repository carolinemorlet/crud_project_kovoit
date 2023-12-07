import { Module } from '@nestjs/common';
import { KidController } from './kid.controller';
import { KidService } from './kid.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Kid, KidSchema } from './schemas/kid.schema';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Kid.name,
        schema: KidSchema,
      },
    ]),
  ],
  controllers: [KidController],
  providers: [KidService, EmailService],
})
export class KidModule {}
