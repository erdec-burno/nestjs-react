import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/db/entity/post.entity';
import { PostDto } from 'src/post/dto/post.dto';
import { Repository } from 'typeorm';
import { User } from '../db/entity/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async create(body: User): Promise<UserDto> {
    const user = await this.usersRepository.save(body);
    return user;
  }
  
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['posts']});
  }

  async findOne(id: number): Promise<User> {
    const result = await this.usersRepository.findOneBy({ id });
    if (typeof result === "object") {
      return result;
    }
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.usersRepository.delete(id);
    if (deleted.affected == 0) {
      return false;
    }
    return true;
  }

  async createUserPost(id: number, body: PostDto) {
    const user = await this.usersRepository.findOneBy({id});
    const newPost = this.postsRepository.create({...body, user});
    return this.postsRepository.save(newPost);
  }
}