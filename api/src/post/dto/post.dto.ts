import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  text: string;
}
