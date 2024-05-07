import { IUserRepository } from '@/users/interfaces/users.interfaces';
import { SignInCommand } from './sign-in.command';
import { IAuthRepository } from '../interfaces/auth.interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import User from '@/users/models/users.model';
import { challengeType } from '../challenge-type.enum';

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
      userId: user.id,
      token: 'user logged',
      challengeType: this.getChallengeType(),
    };
  }

  private getChallengeType(): challengeType {
    const values = Object.values(challengeType);
    const indexRandom = Math.floor(Math.random() * values.length);
    return values[indexRandom] as challengeType;
  }
}
