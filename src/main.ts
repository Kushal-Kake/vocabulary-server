// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();


import {
  INestApplication,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  NestFactory,
} from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fs from 'fs';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const iNestApp: INestApplication<unknown> =
    await NestFactory.create(AppModule);

  const iNestConfigService: ConfigService = iNestApp.get(ConfigService);

  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: true,
      })
    );

  app.enableCors(iNestConfigService.get('cors'));
  try {
    const port: number = iNestConfigService.get<number>('port') as number

    const severUrl: string = `http://${iNestConfigService.get('host')}`;

    await app.listen(port, '0.0.0.0', () =>
      console.log(`🚀 Server ready at ${severUrl}:${port}`),
    );
  } catch (error: any) {
    console.error(`Error while trying to start the server: ${error?.message}`,
      error?.stack,
      bootstrap.name,
    );
  }
}

await bootstrap();
