import { IsEnum, IsString } from 'class-validator';
import { enumTokenType } from '../schemas/token.schema';

export class CreateTokenDto {
  @IsString()
  token: string;

  @IsString()
  refreshToken: string;

  @IsEnum(enumTokenType)
  type: enumTokenType;

  @IsString()
  userId: string;
}
