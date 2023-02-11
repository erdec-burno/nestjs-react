import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../db/entity/post.entity';
import { User } from '../db/entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
