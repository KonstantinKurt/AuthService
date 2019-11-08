import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigService, ConfigModule} from 'nestjs-config';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as path from 'path';
import {typeOrm} from './config/typeorm';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MongooseModule.forRoot(`mongodb://localhost:${process.env.DB_PORT_MONGO}/${process.env.DB_NAME_MONGO}`,
                                ConfigService.get('mongo.options')),
    TypeOrmModule.forRoot(typeOrm),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
