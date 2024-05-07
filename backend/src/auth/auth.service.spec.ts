import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@/providers/databases/prisma/prisma.service';
import { UsersService } from '@/users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: UsersService,
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirstOrThrow: jest.fn().mockImplementation((data) => {
                return new Promise((resolve, reject) => {
                  if (data.where.OR[0].username === 'BryanUs1')
                    reject(new Error('user not found'));

                  resolve({
                    id: 1,
                    name: 'Brayan Sanjuan',
                    email: 'bryan.sj175@gmail.com',
                    username: 'BrayanUs1',
                  });
                });
              }),
            },
            auth: {
              findUniqueOrThrow: jest.fn().mockImplementation((data) => {
                return new Promise((resolve, reject) => {
                  if (data.where.userId === 2)
                    reject(new Error('password not found'));

                  resolve({
                    password: 'hola_mundo',
                  });
                });
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByUsernameOrEmail', () => {
    it('should return a user instance', async () => {
      const passwordExpected = 'hola_mundo';
      const passwordReceived = await service.getUserPasswordById(1);

      expect(passwordExpected).toBe(passwordReceived);
    });

    it('should throw when user not exist', async () => {
      await expect(service.getUserPasswordById(2)).rejects.toThrow(Error);
    });
  });
});
