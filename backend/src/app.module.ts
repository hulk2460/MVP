import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TokenBlacklistService } from './token-blacklist/token-blacklist.service';
import { TokenBlacklistModule } from './token-blacklist/token-blacklist.module';
import { PolicyModule } from './policy/policy.module';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    TokenBlacklistModule,
    PolicyModule,
    ClaimModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenBlacklistService],
})
export class AppModule {}
