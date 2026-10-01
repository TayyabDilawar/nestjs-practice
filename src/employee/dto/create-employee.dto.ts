import { IsMongoId, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name!: string;

  @IsMongoId()
  profile!: string;
}
