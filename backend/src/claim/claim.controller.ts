import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { GetClaimsDto, GetClaimByIdDto } from './dto/get-claims.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Claims Management')
@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({
    description: 'Fetches all claims for a user.',
    summary: 'Get a list of claims',
  })
  async getClaims(@Query() getClaimsDto: GetClaimsDto) {
    try {
      return await this.claimService.getClaims(getClaimsDto);
    } catch (error) {
      throw error; // Forward exceptions to be handled globally
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('submit')
  @ApiOperation({
    description: 'Submit a new claim for a policy.',
    summary: 'Submit a new claim',
  })
  async createClaim(@Body() createClaimDto: CreateClaimDto) {
    try {
      return await this.claimService.createClaim(createClaimDto);
    } catch (error) {
      throw error; // Forward exceptions to be handled globally
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('details')
  @ApiOperation({
    description: 'Fetches details of a specific claim.',
    summary: 'Get claim details',
  })
  async getClaimById(@Query() getClaimByIdDto: GetClaimByIdDto) {
    try {
      return await this.claimService.getClaimById(getClaimByIdDto);
    } catch (error) {
      throw error; // Forward exceptions to be handled globally
    }
  }
}
