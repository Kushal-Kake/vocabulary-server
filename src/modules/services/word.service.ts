import * as TypeORM from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import * as Entities from '../entities/index.js'
import * as Inputs from '../inputs/index.js'
import axios from 'axios'


@Injectable()
export class WordService {
    constructor(
        private configService: ConfigService,
        private dataSource: TypeORM.DataSource,
        @InjectRepository(Entities.WordDefinitions)
        private readonly wordDefinitionsRepository: TypeORM.MongoRepository<Entities.WordDefinitions>
    ) {
        this.wordDefinitionsRepository = this.dataSource.getMongoRepository(Entities.WordDefinitions)
    }

    async words() {
        const wordDefinitions: Entities.WordDefinitions[] | [] = await this.wordDefinitionsRepository.find()
        if(wordDefinitions) {
            return wordDefinitions
        }
        throw new Error(`Failed to feth words. Please try again`)
    }

    async createWord(data: Inputs.WordInput) {
        try {
            
            const responseData = await this.getWordData(data.word);
            
            
            if (responseData) {
                const lexicalEntries = responseData?.results?.[0]?.lexicalEntries?.[0]?.entries?.[0];
                const definitions = lexicalEntries?.senses?.[0]?.definitions || ['No definition available'];
                const etymology = lexicalEntries?.etymologies?.[0] || 'No etymology available';
                const phrases = responseData?.results?.[0]?.lexicalEntries?.[0]?.phrases?.map((phrase: any) => phrase.text) || [];
    
                const wordToCreate: Entities.WordDefinitions = this.wordDefinitionsRepository.create({
                  word: data.word,
                  meaning: definitions[0],
                  etymology: etymology,
                  phrases: phrases,
                });
    
                const word: Entities.WordDefinitions = await this.wordDefinitionsRepository.save(wordToCreate);
               
                
                if (word) {
                  return word;
                }
                throw new Error(`Error while creating word.`);
            }
            throw new Error(`Error while fetching word data from API.`);
        } catch (error: any) {
            console.log(error?.message);
            throw new Error(`Error while creating word: ${error.message}`);
        }
    }
    

    async getWordData(word: string) {
        try {
            const baseUrl: string = this.configService.get('oxfordBaseUrl', "")
            const appId: string = this.configService.get("appId", "")
            const appKey: string = this.configService.get('appKey', "")
            
            const response = await axios.get(`${baseUrl}/entries/en-gb/${word}`, {
                headers: {
                    'app_id': appId,
                    'app_key': appKey,
                }
            });
            
            
            return response.data;
        } catch (error: any) {
            
            console.error('Error fetching the word from Oxford API:', error.message);
            throw new Error(`Error while fetching word data`)
        }
    }
}