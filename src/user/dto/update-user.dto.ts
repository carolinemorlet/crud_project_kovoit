import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {}
