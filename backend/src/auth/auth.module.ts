import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/providers/databases/prisma/prisma.service';
import { SignInCommandHandler } from './command/sign-in.command.handler';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    SignInCommandHandler,
    {
      provide: 'IUserRepository',
      useClass: UsersService,
    },
    {
      provide: 'IAuthRepository',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
