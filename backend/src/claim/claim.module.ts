import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { DatabaseModule } from 'src/database/database.module'; // Adjust if necessary

@Module({
  imports: [DatabaseModule],
  providers: [ClaimService],
  controllers: [ClaimController],
})
export class ClaimModule {}
