import * as NestJSGraphQL from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@NestJSGraphQL.InputType()
export class TextInput {
    @NestJSGraphQL.Field(() => String, {nullable: false})
    @IsNotEmpty()
    @IsString()
    word!: string
}