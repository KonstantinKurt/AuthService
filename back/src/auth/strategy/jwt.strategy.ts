import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {JwtPayload} from '../interfaces/jwt-payload.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from '../entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.AUTH_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<object> {
        const {id} = payload;
        const user = await this.userRepository.findOne({id});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
