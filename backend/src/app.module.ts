import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [AuthModule, UsersModule, ProvidersModule],
  controllers: [],
  providers: [],
  exports: [UsersModule],
})
export class AppModule {}
