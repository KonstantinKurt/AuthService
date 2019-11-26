import {
    MiddlewareConsumer,
    Module,
    RequestMethod,
} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';
import {LoggerMiddleware} from '../middlewares/logger.middleware';
import {JwtStrategy} from './strategy/jwt.strategy';
import {UserEntity} from './entity/user.entity';
import {CheckEmailMiddleware} from './middleware/check-email.middleware';
import {IpUrlEntity} from './entity/ip-url.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            ProfileEntity,
            IpUrlEntity,
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
        consumer
            .apply(CheckEmailMiddleware)
            .forRoutes({path: 'auth/register', method: RequestMethod.ALL});
    }
}
