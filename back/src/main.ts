import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import { ConfigService} from 'nestjs-config';
import * as helmet from 'helmet';
import {getSwaggerDocs} from './config/swagger';
import * as rateLimit from 'express-rate-limit';
import * as requestIp from 'request-ip';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  getSwaggerDocs(app);
  app.use(helmet());
  app.enableCors();
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  }));
  app.use(requestIp.mw());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ConfigService.get('server.appPort'), '0.0.0.0');
  Logger.log(ConfigService.get('server.appStartMessage'));
}
bootstrap();
