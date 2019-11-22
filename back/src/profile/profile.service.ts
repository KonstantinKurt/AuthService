import {
    HttpException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProfileEntity} from './entity/profile.entity';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import {UpdateProfileDto} from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        private readonly jwtService: JwtService,
    ) {
    }

    async getCurrentProfile(token: string) {
        try {
            const userData: any = await this.jwtService.decode(token);
            // const user = await this.profileRepository
            //     .createQueryBuilder()
            //     .where({user: userData.id})
            //     // .getQuery();
            //     .getOne();
            // Logger.log(user);
            // return user;
            const result = await this.profileRepository.findOne({user: userData.id});
            if (!result) {
                throw new NotFoundException({
                    message: `wrong token data`,
                });
            }
            return {
                result,
            };

        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }

    async setAvatar(token: string, avatarId: string) {
        try {
            const userData: any = await this.jwtService.decode(token);
            const serveUrl = `http://localhost:7000/profile/avatar/${avatarId}`;
            const result = await this.profileRepository.update(
                {user: userData.id},
                {avatar: serveUrl},
            );
            if (!result) {
                throw new NotFoundException({
                    message: `wrong token data`,
                });
            }
            return {
                result,
                avatarId,
            };
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }

    async updateProfile(token: string, updateData: object) {
        try {
            const userData: any = await this.jwtService.decode(token);
            await Object.keys(updateData).forEach(key => updateData[key] === '' && delete updateData[key]);
            const update = await this.profileRepository.update(
                {user: userData.id},
                updateData,
            );
            if (!update) {
                throw new NotFoundException({
                    message: `wrong token data`,
                });
            }
            const result = await this.profileRepository.findOne({user: userData.id});
            return {
                result,
            };
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }
}
