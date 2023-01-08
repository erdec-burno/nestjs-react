import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({ summary: "Get users"})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Create user"})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() body: User) {
    return this.usersService.create(body);
  }
}
