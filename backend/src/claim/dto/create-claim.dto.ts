import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateClaimDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  policyId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  claimDetails: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  digitalBills: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  updateHistory: string[];
}
