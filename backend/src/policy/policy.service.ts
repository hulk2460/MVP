import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { DatabaseService } from 'src/database/database.service';
import { GetPoliciesDto } from './dto/get-policies.dto';

@Injectable()
export class PolicyService {
  constructor(private readonly dataservice: DatabaseService) {}

  async getPolicies(getPoliciesDto: GetPoliciesDto) {
    let { userId } = getPoliciesDto;

    // Convert userId to number if it's a string
    if (typeof userId === 'string') {
      userId = parseInt(userId, 10);
    }

    // Validate userId type
    if (typeof userId !== 'number' || isNaN(userId)) {
      throw new BadRequestException(
        'UserID does not exists/Invalid userId, must be a number',
      );
    }
    try {
      const policies = await this.dataservice.policy.findMany({
        where: { userId },
        select: {
          id: true,
          policyNumber: true,
          provider: true,
          coverageDetails: true,
        },
      });

      // Convert BigInt id to string for serialization
      const serializedPolicies = policies.map((policy) => ({
        policyId: policy.id,
        policyNumber: policy.policyNumber.toString(), // Convert BigInt to string
        provider: policy.provider,
        coverageDetails: policy.coverageDetails,
      }));

      return { policies: serializedPolicies };
    } catch (error) {
      // Handle or log specific errors
      if (error instanceof BadRequestException) {
        throw error; // Re-throw the specific error
      } else {
        throw new InternalServerErrorException(
          'An error occurred while fetching policies',
        );
      }
    }
  }

  async createPolicy(createPolicyDto: CreatePolicyDto) {
    const { userId, policyNumber, provider, coverageDetails } = createPolicyDto;

    try {
      // Check if the user exists
      const userExists = await this.dataservice.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new NotFoundException('User does not exist/invalid user');
      }

      // Check if the policy number already exists
      const existingPolicy = await this.dataservice.policy.findFirst({
        where: { policyNumber: BigInt(policyNumber) }, // Convert policyNumber to BigInt
      });

      if (existingPolicy) {
        throw new NotFoundException('Policy number already exists');
      }

      // Create the new policy
      const policy = await this.dataservice.policy.create({
        data: {
          userId,
          policyNumber: BigInt(policyNumber), // Convert policyNumber to BigInt
          provider,
          coverageDetails,
        },
        select: {
          id: true,
        },
      });

      return { policyId: policy.id, status: 'Policy created successfully' };
    } catch (error) {
      // Log the error for debugging
      console.error('Error creating policy:', error);

      // Handle specific errors
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw specific errors
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the policy',
        );
      }
    }
  }
}
