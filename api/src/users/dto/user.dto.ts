import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  isActive: boolean;
}
