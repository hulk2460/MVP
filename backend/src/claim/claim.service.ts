import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { GetClaimByIdDto, GetClaimsDto } from './dto/get-claims.dto';

@Injectable()
export class ClaimService {
  constructor(private readonly dataservice: DatabaseService) {}

  async getClaims(getClaimsDto: GetClaimsDto) {
    let { userId } = getClaimsDto;
    // Convert userId to number if it's a string
    if (typeof userId === 'string') {
      userId = parseInt(userId, 10);
    }

    // Validate userId type
    if (typeof userId !== 'number' || isNaN(userId)) {
      throw new NotFoundException(
        'UserID does not exists/Invalid userId, must be a number',
      );
    }
    try {
      // Check if the user exists
      const userExists = await this.dataservice.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new NotFoundException('User does not exist/invalid user');
      }

      const claims = await this.dataservice.claim.findMany({
        where: { userId },
        select: {
          id: true,
          claimDetails: true,
          status: true,
          createdAt: true,
        },
      });

      return { claims };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw specific errors
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching claims',
      );
    }
  }

  async createClaim(createClaimDto: CreateClaimDto) {
    const { userId, policyId, claimDetails, digitalBills, updateHistory } =
      createClaimDto;

    try {
      // Check if the user exists
      const userExists = await this.dataservice.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new NotFoundException('User does not exist/invalid user');
      }

      // Check if the policy exists
      const policyExists = await this.dataservice.policy.findUnique({
        where: { id: policyId },
      });

      if (!policyExists) {
        throw new NotFoundException('Policy does not exist/invalid policy');
      }

      // Check if a claim with the same details already exists
      const existingClaim = await this.dataservice.claim.findFirst({
        where: { userId, policyId, claimDetails },
      });

      if (existingClaim) {
        throw new NotFoundException('Claim with these details already exists');
      }

      // Create the claim
      const claim = await this.dataservice.claim.create({
        data: {
          userId,
          policyId,
          claimDetails,
          digitalBills, // Single string link
          status: 'pending',
          updateHistory,
        },
        select: {
          id: true,
        },
      });

      return { claimId: claim.id, status: 'Claim submitted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw specific errors
      }
      throw new InternalServerErrorException(
        'An error occurred while submitting the claim',
      );
    }
  }

  async getClaimById(getClaimByIdDto: GetClaimByIdDto) {
    let { claimId } = getClaimByIdDto;
    // Convert claimId to number if it's a string
    if (typeof claimId === 'string') {
      claimId = parseInt(claimId, 10);
    }

    // Validate claimId type
    if (typeof claimId !== 'number' || isNaN(claimId)) {
      throw new NotFoundException(
        'ClaimID does not exists/Invalid claimId, must be a number',
      );
    }
    try {
      const claim = await this.dataservice.claim.findUnique({
        where: { id: claimId },
        select: {
          id: true,
          claimDetails: true,
          status: true,
          updateHistory: true,
        },
      });

      if (!claim) {
        throw new NotFoundException('Claim not found');
      }

      return claim;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw specific errors
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching claim details',
      );
    }
  }
}
