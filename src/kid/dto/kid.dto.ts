import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Association } from 'src/association/schemas/association.schema';

export class kidDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  birthdate: Date;

  // @IsArray()
  // @IsString({ each: true })
  // assoId: Association[];
}

// // @IsArray()
// @IsString({ each: true })
// userId: User[];
