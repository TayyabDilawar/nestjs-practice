import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsInt()
  age?: number;

  @IsString()
  qualification!: string;
}
