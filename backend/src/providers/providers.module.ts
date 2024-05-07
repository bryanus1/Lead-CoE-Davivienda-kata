import { Module } from '@nestjs/common';
import { PrismaService } from './databases/prisma/prisma.service';
import { OtpService } from './external/otp.service';

@Module({
  providers: [PrismaService, OtpService],
})
export class ProvidersModule {}
