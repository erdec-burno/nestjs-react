import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { Post as Posts } from 'src/db/entity/post.entity';
import { Response } from 'express';

@ApiTags("Posts")
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: "Get posts"})
  @ApiResponse({ status: 200, type: [PostDto]})
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: "Create post"})
  @ApiResponse({ status: 200, type: PostDto})
  @Post()
  create(@Body() createPostDto: PostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: "Get post by ID"})
  @ApiResponse({ status: 200, type: PostDto})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({ summary: "Update post"})
  @ApiResponse({ status: 200, type: PostDto})
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: PostDto) {
    return this.postService.update(+id, body);
  }

  @ApiOperation({ summary: "Remove post"})
  @ApiResponse({status: 200, type: String})
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.postService.remove(id);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Not found", result: result});
    } else {
      res.status(HttpStatus.OK).json({ message: "success", result: result});
    }
  }
}
