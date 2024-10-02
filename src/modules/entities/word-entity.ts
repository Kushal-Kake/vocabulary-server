import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';
import * as NestJSGraphQL from '@nestjs/graphql';

@TypeORM.Entity()
@NestJSGraphQL.ObjectType()
export class WordDefinitions extends BaseAuditableEntity {
  
  // Word field
  @NestJSGraphQL.Field(() => String, { nullable: false })
  @TypeORM.Column({ type: 'varchar', nullable: false })
  word!: string;

  // Meaning/Definition field
  @NestJSGraphQL.Field(() => String, { nullable: false })
  @TypeORM.Column({ nullable: false, type: 'varchar' })
  meaning!: string;

  // Phrases associated with the word
  @NestJSGraphQL.Field(() => [String], { nullable: true })
  @TypeORM.Column("simple-array", { nullable: true })
  phrases?: string[];

  // Synonyms field (if applicable)
  @NestJSGraphQL.Field(() => [String], { nullable: true })
  @TypeORM.Column("simple-array", { nullable: true })
  synonyms?: string[];

  // Example sentences field
  @NestJSGraphQL.Field(() => [String], { nullable: true })
  @TypeORM.Column("simple-array", { nullable: true })
  examples?: string[];

  // Etymology (word origin)
  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.Column({ nullable: true, type: 'varchar' })
  etymology?: string;
}
