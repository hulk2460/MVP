import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { GetPoliciesDto } from './dto/get-policies.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Policy Management')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @ApiBearerAuth() // Indicates that the endpoint requires a bearer token
  @UseGuards(JwtAuthGuard) // Protects the endpoint with JWT authentication
  @Get('get')
  @ApiOperation({
    description:
      'Fetches all insurance policies linked to the specified user ID. Returns a list of policy details.',
    summary: 'Get a list of policies',
  })
  async getPolicies(@Query() getPoliciesDto: GetPoliciesDto) {
    try {
      return await this.policyService.getPolicies(getPoliciesDto);
    } catch (error) {
      // Forward exceptions to be handled globally
      throw error;
    }
  }

  @ApiBearerAuth() // Indicates that the endpoint requires a bearer token
  @UseGuards(JwtAuthGuard) // Protects the endpoint with JWT authentication
  @Post('add')
  @ApiOperation({
    description:
      'Allows a user to add a new insurance policy. Requires user ID, policy number, provider, and coverage details.',
    summary: 'Add a new policy',
  })
  async createPolicy(@Body() createPolicyDto: CreatePolicyDto) {
    try {
      return await this.policyService.createPolicy(createPolicyDto);
    } catch (error) {
      // Forward exceptions to be handled globally
      throw error;
    }
  }
}
