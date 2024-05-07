import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@/providers/databases/prisma/prisma.service';
import { SignInCommandHandler } from './command/sign-in.command.handler';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { OtpService } from '@/providers/external/otp.service';
import { ProductService } from '@/providers/external/product.service';
import { WordCombinationService } from '@/providers/external/word-combination.service';

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
    OtpService,
    ProductService,
    WordCombinationService,
  ],
})
export class AuthModule {}
