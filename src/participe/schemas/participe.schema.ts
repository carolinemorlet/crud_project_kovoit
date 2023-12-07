import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Carshare } from 'src/carshare/schemas/carshare.schema';
import { Kid } from 'src/kid/schemas/kid.schema';

export type ParticipeDocument = Participe & Document;

@Schema({ collection: 'participe', timestamps: true, versionKey: false })
export class Participe {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  eventId: Event;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carshare',
    default: null,
  })
  carshareId: Carshare;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Kid' })
  kidId: Kid;
}

export const ParticipeSchema = SchemaFactory.createForClass(Participe);
