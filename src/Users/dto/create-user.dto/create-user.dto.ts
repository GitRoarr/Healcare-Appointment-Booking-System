import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly bio: string;

  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly role?: string;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly departement: string;
}
