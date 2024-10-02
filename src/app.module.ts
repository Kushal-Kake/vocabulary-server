import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getOrmConfig } from './modules/config/orm.config.js';
import * as loadConfiguration from './modules/config/app.config.js'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { gqlConfig } from './modules/config/gql.config.js';
import { ServerModule } from './modules/server.module.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOrmConfig
    }),
    ConfigModule.forRoot({
      load: [...Object.values(loadConfiguration)],
      isGlobal: true
    }),
    GraphQLModule.forRootAsync<ApolloDriverAsyncConfig>(gqlConfig),
    ServerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
