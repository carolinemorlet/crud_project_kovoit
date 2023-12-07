import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { Address, AddressSchema } from 'src/common/schemas/address.schema';
import { EDate, EDateSchema } from './eDate.schema';
import { Group } from 'src/group/schemas/group.schema';

export type EventDocument = EventCollection & Document;

@Schema({ collection: 'event', timestamps: true, versionKey: false })
export class EventCollection {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: AddressSchema })
  eventAddress: Address;

  @Prop({ type: AddressSchema })
  departureAddress: Address;

  @Prop({ type: EDateSchema })
  eDate: EDate;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Association' })
  // associationId: Association;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: [] }])
  groupId: Group[];
}

export const EventSchema = SchemaFactory.createForClass(EventCollection);
