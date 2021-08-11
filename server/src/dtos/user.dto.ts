import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UserDataDto {
  id?: number;

  username?: string;

  @IsString()
  email: string;

  password?: string;

  profile?: string;

  resign?: boolean;

  admin?: boolean;
}
