import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, EventCollection } from './schemas/event.schema';
import { Association, AssociationSchema } from 'src/association/schemas/association.schema';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: EventCollection.name, schema: EventSchema },
        { name: Association.name, schema: AssociationSchema }
      ]
    )
  ],
  controllers: [EventController],
  providers: [EventService],

})
export class EventModule {}
