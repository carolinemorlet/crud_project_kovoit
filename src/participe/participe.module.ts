import { Module } from '@nestjs/common';
import { ParticipeController } from './participe.controller';
import { ParticipeService } from './participe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventCollection, EventSchema } from 'src/event/schemas/event.schema';
import { Association, AssociationSchema } from 'src/association/schemas/association.schema';
import { Participe, ParticipeSchema } from './schemas/participe.schema';
import { Kid, KidSchema } from 'src/kid/schemas/kid.schema';
import { Relation, RelationSchema } from 'src/relation/schemas/relation.schema';
import { Carshare, CarshareSchema } from 'src/carshare/schemas/carshare.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Participe.name, schema: ParticipeSchema},
        { name: EventCollection.name, schema: EventSchema },
        // { name: Association.name, schema: AssociationSchema },
        { name: Relation.name, schema: RelationSchema},
        { name: Kid.name, schema: KidSchema},
        {name: Carshare.name, schema:CarshareSchema}
      ]
    )
  ],
  controllers: [ParticipeController],
  providers: [ParticipeService]
})
export class ParticipeModule {}
