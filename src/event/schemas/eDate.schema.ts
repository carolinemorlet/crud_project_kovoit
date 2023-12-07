import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

export type EDateDocument = EDate & Document;

@Schema({ _id: false, versionKey: false })
export class EDate {
  @Prop({ required: true })
  event: Date;

  @Prop({ required: true })
  departure: Date;
}

export const EDateSchema = SchemaFactory.createForClass(EDate);
