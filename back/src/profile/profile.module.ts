import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ProfileEntity} from './entity/profile.entity';
import {JwtModule, JwtModuleOptions, JwtService} from '@nestjs/jwt';
import {JwtStrategy} from '../auth/strategy/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../auth/schemas/user.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfileEntity,
        ]),
        MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: UserSchema,
                },
            ],
        ),
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
    controllers: [
        ProfileController,
    ],
    providers: [
        ProfileService,
    ],
})
export class ProfileModule {
}
