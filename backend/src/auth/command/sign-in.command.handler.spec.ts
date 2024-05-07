import { IUserRepository } from '@/users/interfaces/users.interfaces';
import { SignInCommandHandler } from './sign-in.command.handler';
import User from '@/users/models/users.model';
import { IAuthRepository } from '../interfaces/auth.interfaces';
import { BadRequestException } from '@nestjs/common';

describe('SignInCommandHandler', () => {
  let commandHandler: SignInCommandHandler;
  const userRepositoryMock: IUserRepository = {
    getByUsernameOrEmail: jest.fn().mockImplementation((data) => {
      return new Promise((resolve, reject) => {
        if (data === 'BryanUs1') reject(new Error('user not found'));

        resolve(
          User.fromJson({
            id: 1,
            name: 'Brayan Sanjuan',
            email: 'bryan.sj175@gmail.com',
            username: 'BrayanUs1',
          }),
        );
      });
    }),
  };

  const authRepositoryMock: IAuthRepository = {
    getUserPasswordById: jest.fn().mockImplementation((data) => {
      return new Promise((resolve, reject) => {
        if (data === 2) reject(new Error('user not found'));

        resolve('hola_mundo');
      });
    }),
  };

  beforeEach(() => {
    commandHandler = new SignInCommandHandler(
      userRepositoryMock,
      authRepositoryMock,
    );
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
  });

  describe('signIn', () => {
    it('should user data when user logged', async () => {
      const response = await commandHandler.signIn({
        username: 'BrayanUs1',
        password: 'hola_mundo',
      });

      expect(response.token).toBe('user logged');
    });

    it('should throw if user not exists', async () => {
      await expect(
        commandHandler.signIn({
          username: 'BryanUs1',
          password: 'hola_mundo',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if password is incorrect', async () => {
      await expect(
        commandHandler.signIn({
          username: 'BrayanUs1',
          password: 'hello_word',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
