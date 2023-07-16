import { Module } from '@nestjs/common';
import { databaseProviders } from './typeOrmConfig';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
