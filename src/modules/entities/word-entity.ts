import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';
import * as NestJSGraphQL from '@nestjs/graphql';

@TypeORM.Entity()
@NestJSGraphQL.ObjectType()
export class WordDefinitions extends BaseAuditableEntity {
  @NestJSGraphQL.Field(() => String, { nullable: false })
  @TypeORM.Column({ type: 'varchar', nullable: false })
  word!: string;

  @NestJSGraphQL.Field(() => String, { nullable: false })
  @TypeORM.Column({ nullable: false, type: 'varchar' })
  meaning!: string;

  @NestJSGraphQL.Field(() => [String], { nullable: true })
  @TypeORM.Column("simple-array", { nullable: true })
  phrases?: string[];

  
  @NestJSGraphQL.Field(() => [String], { nullable: true })
  @TypeORM.Column("simple-array", { nullable: true })
  synonyms?: string[];

  @NestJSGraphQL.Field(() => [String], { nullable: true })
  @TypeORM.Column("simple-array", { nullable: true })
  examples?: string[];

  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.Column({ nullable: true, type: 'varchar' })
  etymology?: string;
}
