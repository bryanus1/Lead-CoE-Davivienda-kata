import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './interfaces/auth.interfaces';
import { PrismaService } from '@/providers/databases/prisma/prisma.service';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(private prismaService: PrismaService) {}

  async getUserPasswordById(id: number): Promise<string> {
    const response = await this.prismaService.auth.findUniqueOrThrow({
      where: {
        userId: id,
      },
    });

    return response.password;
  }
}
