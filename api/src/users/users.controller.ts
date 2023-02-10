import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../db/entity/user.entity';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({ summary: "Get users"})
  @ApiResponse({status: 200, type: [UserDto]})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @ApiOperation({ summary: "Get user by ID"})
  @ApiResponse({status: 200, type: UserDto})
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const result = await this.usersService.findOne(id);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({});
    } else {
      res.status(HttpStatus.OK).json(result);
    }
  }

  @ApiOperation({ summary: "Create user"})
  @ApiResponse({status: 200, type: UserDto})
  @Post()
  create(@Body() body: User) {
    return this.usersService.create(body);
  }
  
  @ApiOperation({ summary: "Remove user"})
  @ApiResponse({status: 200, type: String})
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.remove(id);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Not found", result: result});
    } else {
      res.status(HttpStatus.OK).json({ message: "success", result: result});
    }
  }

}
