import { IUserRepository } from '@/users/interfaces/users.interfaces';
import { SignInCommandHandler } from './sign-in.command.handler';
import User from '@/users/models/users.model';
import { IAuthRepository } from '../interfaces/auth.interfaces';

describe('SignInCommandHandler', () => {
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

        resolve('hala_mundo');
      });
    }),
  };

  it('should be defined', () => {
    const commandHandler = new SignInCommandHandler(
      userRepositoryMock,
      authRepositoryMock,
    );

    expect(commandHandler).toBeDefined();
  });
});
