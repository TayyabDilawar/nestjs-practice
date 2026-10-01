import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street!: string;

  @IsString()
  city!: string;
}

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
