import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const getOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {  
  return {
    type: 'mongodb',
    url: configService.get<string>('mongodb.uri'),
    synchronize: true,
    autoLoadEntities: true,
  };
};

export { getOrmConfig };
