import * as NestJSGraphQL from '@nestjs/graphql'
import * as Services from '../services/index.js'
import * as Entities from '../entities/index.js'
import * as Inputs from '../inputs/index.js'

@NestJSGraphQL.ObjectType()
export class WordResolver {
    constructor(
        private wordService: Services.WordService
    ) { }

    @NestJSGraphQL.Query(() => [Entities.WordDefinitions])
    async words() {
        return await this.wordService.words()
    }

    @NestJSGraphQL.Mutation(() => Entities.WordDefinitions)
    async createWord(@NestJSGraphQL.Args('data') data: Inputs.TextInput) {
        return await this.wordService.createWord(data)
    }
}