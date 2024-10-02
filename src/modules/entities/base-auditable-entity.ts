import * as TypeORM from 'typeorm'
import { BaseEntity } from './base-entity.js' 
import {Transform}  from 'class-transformer'
import * as NestJSGraphQL from '@nestjs/graphql'

@NestJSGraphQL.ObjectType()
export abstract class BaseAuditableEntity extends BaseEntity {
    @NestJSGraphQL.Field({nullable: true})
    @TypeORM.Column({nullable: true})
    @Transform((property) => {
        if(property && property.value) {
            return new Date(property.value)
        }
        return null
    })
    public updatedOn?: Date;

    @NestJSGraphQL.Field({nullable: false})
    @TypeORM.Column({nullable: false})
    @Transform((property) => {
        if(property && property.value) {
            return new Date(property.value)
        }
        return null
    })
    public createdOn?: Date;

    @TypeORM.BeforeUpdate()
    public setUpdatedAt() {
        this.updatedOn = new Date()
    }

    @TypeORM.BeforeInsert()
    public setCreatedOn() {
        this.createdOn = new Date()
    }

}