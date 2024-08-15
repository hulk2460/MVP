import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Called when the module is initialized.
   * Connects to the database using PrismaClient.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Called when the module is destroyed.
   * Disconnects from the database using PrismaClient.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
