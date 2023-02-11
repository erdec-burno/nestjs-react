import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/db/entity/post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  async create(body: PostDto): Promise<Post> {
    const post = await this.postsRepository.save(body);
    return post;
  }

  findAll() {
    return this.postsRepository.find();
  }

  async findOne(id: number) {
    const result = await this.postsRepository.findOneBy({ id });
    if (typeof result === 'object') {
      return result;
    }
  }

  async update(id: number, body: PostDto) {
    const result = await this.postsRepository.update(id, body);
    if (result.affected == 0) {
      return false;
    }
    return true;
  }

  async remove(id: string) {
    const deleted = await this.postsRepository.delete(id);
    if (deleted.affected == 0) {
      return false;
    }
    return true;
  }
}
