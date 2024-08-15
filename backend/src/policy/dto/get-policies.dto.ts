import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetPoliciesDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
