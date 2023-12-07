import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
// import { enumUserStatus } from '../schemas/user.schema';
import { Role } from '../schemas/role.schema';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  associationName: string;

  // @IsEnum(enumUserStatus)
  // status: enumUserStatus;

  @ValidateNested()
  roles: Role[];

  // @IsBoolean()
  // all_event_available: boolean;
}
