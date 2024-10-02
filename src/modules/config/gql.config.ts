import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverAsyncConfig } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as TypeORM from "typeorm";
import * as Entities from '../entities/index.js'
import { getOrmConfig } from "./orm.config.js";

const gqlConfig: ApolloDriverAsyncConfig = {
  driver: ApolloDriver,
  imports: [
    TypeOrmModule.forFeature([...Object.values(Entities)]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOrmConfig,
    }),
    ConfigModule,
  ],
  useFactory: async (
    configService: ConfigService
  ) => ({
    path: "/graphql",
    autoSchemaFile: true,
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  }),
  inject: [TypeORM.DataSource, ConfigService],
};

export { gqlConfig };