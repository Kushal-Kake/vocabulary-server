import * as NestJSGraphQL from '@nestjs/graphql'
import { IsString } from 'class-validator'

@NestJSGraphQL.InputType()
export class TextFilterInput {
    @NestJSGraphQL.Field(() => String, {nullable: true})
    @IsString()
    _id?: string

    @NestJSGraphQL.Field(() => String, {nullable: true})
    @IsString()
    text?: string
}