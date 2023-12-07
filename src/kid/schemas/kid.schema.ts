import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';

export type KidDocument = Kid & Document;

@Schema({ collection: 'kid', timestamps: true, versionKey: false })
export class Kid {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ required: true })
  email: string;

  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Association' }])
  // assoId: Association[];
}

export const KidSchema = SchemaFactory.createForClass(Kid);

// @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
// userId: User[];

// @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Association' }])
// assoId: Association;
