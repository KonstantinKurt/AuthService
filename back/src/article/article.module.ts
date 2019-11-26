import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ArticleController} from './article.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ArticleEntity} from './entity/article.entity';
import {LoggerMiddleware} from '../middlewares/logger.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([
        ProfileEntity,
        ArticleEntity,
    ]),
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN,
            },
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        })],
    providers: [ArticleService],
    controllers: [ArticleController],
})
export class ArticleModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({path: 'article', method: RequestMethod.ALL});
    }
}
