import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type CarshareDocument = Carshare & Document;

@Schema({ collection: 'carshare', timestamps: true, versionKey: false })
export class Carshare {
  @Prop({ required: true })
  available_seat: number;
  @Prop({ default: true })
  public: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  eventId: Event;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const CarshareSchema = SchemaFactory.createForClass(Carshare);
