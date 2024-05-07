import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/users.interfaces';
import { PrismaService } from '@/providers/databases/prisma/prisma.service';
import User from './models/users.model';

@Injectable()
export class UsersService implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  /**
   * find user by username or email
   * @param usernameOrEmail string
   * @returns User
   */
  async getByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    const response = await this.prismaService.user.findFirstOrThrow({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
      },
    });

    return User.fromJson(response);
  }
}
