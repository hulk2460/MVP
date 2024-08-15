import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetClaimsDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

export class GetClaimByIdDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  claimId: number;
}
