import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/providers/databases/prisma/prisma.service';
import { OtpService } from '@/providers/external/otp.service';
import { ProductService } from '@/providers/external/product.service';
import { WordCombinationService } from '@/providers/external/word-combination.service';
import { SignInCommandHandler } from './command/sign-in.command.handler';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: UsersService,
        },
        {
          provide: SignInCommandHandler,
          useValue: SignInCommandHandler,
        },
        {
          provide: OtpService,
          useValue: OtpService,
        },
        {
          provide: ProductService,
          useValue: ProductService,
        },
        {
          provide: WordCombinationService,
          useValue: WordCombinationService,
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
