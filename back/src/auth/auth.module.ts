import {
    MiddlewareConsumer,
    Module,
    RequestMethod,
} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';
import {IpUrlSchema} from './schemas/ip-url.schema';
import {LoggerMiddleware} from '../middlewares/logger.middleware';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: UserSchema,
                },
                {
                    name: 'IpUrl',
                    schema: IpUrlSchema,
                },
            ],
        ),
        TypeOrmModule.forFeature([
            ProfileEntity,
        ]),
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN,
            },
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        PassportModule,
        JwtStrategy,
        JwtModule,
    ],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({path: 'auth', method: RequestMethod.ALL});
    }
}
