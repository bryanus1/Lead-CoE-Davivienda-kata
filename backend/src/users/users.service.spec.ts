import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/providers/databases/prisma/prisma.service';
import User from './models/users.model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByUsernameOrEmail', () => {
    it('should return a user instance', async () => {
      const userExpected = User.fromJson({
        id: 1,
        name: 'Brayan Sanjuan',
        email: 'bryan.sj175@gmail.com',
        username: 'BrayanUs1',
      });

      const userReceived = await service.getByUsernameOrEmail(
        userExpected.username,
      );

      expect(userReceived).toBeInstanceOf(User);
      expect(userReceived.toJson()).toEqual(userExpected.toJson());
    });

    it('should throw when user not exist', async () => {
      const userExpected = User.fromJson({
        id: 1,
        name: 'Brayan Sanjuan',
        email: 'bryan.sj175@gmail.com',
        username: 'BryanUs1',
      });

      await expect(
        service.getByUsernameOrEmail(userExpected.username),
      ).rejects.toThrow(Error);
    });
  });
});
