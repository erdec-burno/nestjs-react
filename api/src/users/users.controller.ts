import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../db/entity/user.entity';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { PostDto } from 'src/post/dto/post.dto';
import { FileService } from 'src/services/file/file.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private fileService: FileService,
  ) {}

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'download all users' })
  @ApiResponse({ status: 200 })
  @Get('download')
  getUsersFile(@Res({ passthrough: true }) res: Response) {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="regulament.pdf"',
    });
    return this.fileService.download('/assets/pdf/regulament.pdf');
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const result = await this.usersService.findOne(id);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({});
    } else {
      res.status(HttpStatus.OK).json(result);
    }
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post()
  create(@Body() body: User) {
    return this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 200, type: String })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.remove(id);
    if (!result) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Not found', result: result });
    } else {
      res.status(HttpStatus.OK).json({ message: 'success', result: result });
    }
  }

  @ApiOperation({ summary: 'Create user post' })
  @ApiResponse({ status: 200, type: PostDto })
  @Post(':id/posts')
  createPost(@Param('id') id: number, @Body() body: PostDto) {
    return this.usersService.createUserPost(id, body);
  }
}
