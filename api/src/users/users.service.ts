import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(body: User): Promise<User> {
    const user = await this.usersRepository.save(body);
    return user;
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const result = await this.usersRepository.findOneBy({ id });
    if (typeof result === "object") {
      return result;
    }
    //console.log(id, result);
    //return result;
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.usersRepository.delete(id);
    if (deleted.affected == 0) {
      return false;
    }
    return true;
  }
}