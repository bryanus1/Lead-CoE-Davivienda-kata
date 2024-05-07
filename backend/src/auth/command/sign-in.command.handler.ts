import { IUserRepository } from 'src/users/interfaces/users.interfaces';
import { SignInCommand } from './sign-in.command';
import { IAuthRepository } from '../interfaces/auth.interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import User from 'src/users/models/users.model';

@Injectable()
export class SignInCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    @Inject('IAuthRepository')
    private authRepository: IAuthRepository,
  ) {}

  public async signIn(signInCommand: SignInCommand) {
    let user: User;
    try {
      user = await this.userRepository.getByUsernameOrEmail(
        signInCommand.username,
      );
    } catch (error) {
      throw new BadRequestException('Username y/o contraseña inválido');
    }

    let password: string;
    try {
      password = await this.authRepository.getUserPasswordById(user.id);
    } catch (error) {
      throw new BadRequestException('Username y/o contraseña inválido');
    }

    if (signInCommand.password !== password) {
      throw new BadRequestException('Username y/o contraseña inválido');
    }

    return {
      token: 'user logged',
    };
  }
}
