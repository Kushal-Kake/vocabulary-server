import * as TypeORM from 'typeorm'
import * as NestJSGraphQL from '@nestjs/graphql'

@NestJSGraphQL.ObjectType()
export abstract class BaseEntity {
    @NestJSGraphQL.Field(() => NestJSGraphQL.ID)
    @TypeORM.ObjectIdColumn()
    _id!: TypeORM.ObjectId
}