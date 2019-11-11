import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrm: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST_POSTGRES,
    port: +process.env.DB_PORT_POSTGRES,
    username: process.env.DB_USERNAME_POSTGRES,
    password: process.env.DB_PASSWORD_POSTGRES,
    database: process.env.DB_NAME_POSTGRESS,
    synchronize: true,
    logging: true,
    entities: ['.src/**/*.entity.ts', './dist/**/*.entity.js'],
};
