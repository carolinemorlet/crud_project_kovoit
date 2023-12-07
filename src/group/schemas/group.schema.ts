import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { Kid } from 'src/kid/schemas/kid.schema';

export type GroupDocument = Group & Document;

@Schema({ collection: 'group', timestamps: true, versionKey: false })
export class Group {
  @Prop({ required: true })
  name: string;
  @Prop({ default: '#fcf4dd' })
  color: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Association' })
  associationId: Association;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Kid', default: [] }])
  kidId: Kid[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
