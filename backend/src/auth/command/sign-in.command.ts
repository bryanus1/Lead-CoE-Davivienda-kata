import { IsNotEmpty, IsString } from 'class-validator';

export class SignInCommand {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
