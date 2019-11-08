import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schema/user.schema';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
          {
            name: 'User',
            schema: UserSchema,
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
  providers: [AuthService],
})
export class AuthModule {}
