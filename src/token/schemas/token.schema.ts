import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TokenDocument = Token & Document;

export enum enumTokenType {
  createUserByAsso,
  //todo
}

@Schema({ collection: 'token', timestamps: true, versionKey: false })
export class Token {
  @Prop({ required: true })
  token: string;

  @Prop()
  refreshToken: string;

  @Prop({ required: true, type: Number, enum: enumTokenType })
  type: enumTokenType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
