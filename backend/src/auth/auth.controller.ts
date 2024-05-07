import { Body, Controller, Post } from '@nestjs/common';
import { SignInCommandHandler } from './command/sign-in.command.handler';
import { SignInCommand } from './command/sign-in.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInCommandHandler: SignInCommandHandler) {}

  @Post('sign-in')
  signIn(@Body() credentials: SignInCommand): Promise<object> {
    return this.signInCommandHandler.signIn(credentials);
  }
}
