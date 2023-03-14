import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  question: string;
}
