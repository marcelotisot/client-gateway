import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [UsersModule, AuthModule, CategoriesModule]
})
export class AppModule {}
