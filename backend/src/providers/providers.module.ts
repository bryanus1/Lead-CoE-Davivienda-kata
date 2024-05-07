import { Module } from '@nestjs/common';
import { PrismaService } from './databases/prisma/prisma.service';

@Module({
  providers: [PrismaService],
})
export class ProvidersModule {}
