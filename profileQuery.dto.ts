import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class ProfileQueryDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;}
