import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './entities/index.js'
import * as Services from './services/index.js'
import * as Resolvers from './resolvers/index.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([...Object.values(Entities)]),
    ConfigModule,
  ],
  providers: [
    ConfigService,
    ...Object.values(Services),
    ...Object.values(Resolvers)
  ],
  controllers: []
})
export class ServerModule {}


