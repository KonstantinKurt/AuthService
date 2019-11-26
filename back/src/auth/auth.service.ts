import {HttpException, Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';
import {LessThan, MoreThan, Repository} from 'typeorm';
import {checkIpInDB} from './helpers/checkip-db.helper';
import {MailerService} from '@nest-modules/mailer';
import {getNewIpLetter} from './helpers/newip-letter.helper';
import {getHash} from './helpers/hash-gen.helper';
import {UpdatePasswordDto} from './dto/update-password.dto';
import {UserEntity} from './entity/user.entity';
import {IpUrlEntity} from './entity/ip-url.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        @InjectRepository(IpUrlEntity)
        private readonly ipUrlRepository: Repository<IpUrlEntity>,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(userData: LoginDto, ip: string, agent: string, device: any) {
        try {
            const user = await this.userRepository.findOne({email: userData.email});
            if (user) {
                const comparePassword = bcrypt.compareSync(userData.password, user.password);
                if (comparePassword) {
                    if (!checkIpInDB(user, ip)) {
                        const cryptIp = getHash(15);
                        const link = `${process.env.DEV_APP_URL}/auth/ip/${cryptIp}`;
                        const newIpUrl = await this.ipUrlRepository.create({hash: cryptIp, user, ip});
                        newIpUrl.save();
                        await this.mailerService.sendMail(getNewIpLetter(user, ip, agent, device, link))
                            .catch(err => {
                                Logger.log(`MAILER ERROR`);
                                Logger.log(err);
                            });
                    }
                    const accessPayload: JwtPayload = {
                        id: user.id,
                        name: user.name,
                        expires_in: process.env.AUTH_TOKEN_EXPIRES_IN,
                    };
                    const accessToken = await this.jwtService.sign(accessPayload);
                    return {
                        user_data: accessPayload,
                        access_token: `Bearer ${accessToken}`,
                    };
                } else {
                    throw new UnauthorizedException({
                        message: `Wrong password`,
                    });
                }
            } else {
                throw new NotFoundException({
                    message: `User not found`,
                });
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }

    }

    async register(userData: RegisterDto, ip: string) {
        try {
            const newProfile = await this.profileRepository.create({
                name: userData.name,
                email: userData.email,
            });
            const resultProfile = await this.profileRepository.save(newProfile);
            if (resultProfile) {
                const newUser = await this.userRepository.create({
                    name: userData.name,
                    email: userData.email,
                    password: await bcrypt.hashSync(userData.password, +process.env.USER_PASSWORD_SALT),
                    profile: newProfile,
                    ips: [],
                });
                await newUser.ips.push(ip);
                const resultUser = await newUser.save();
                return {
                    user: resultUser,
                };
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

    async newIpUpdate(hash: string) {
        const now = new Date();
        const expiredParam = new Date(now.setHours(now.getHours() + +process.env.ID_NOTIFICATION_EXPIRED));
        try {
            const ipUrl = await this.ipUrlRepository.findOne({
                hash,
                createdAt: LessThan(expiredParam),
            }, { relations: ['user']});
            if (ipUrl) {
                const userForIpAdd  = await this.userRepository.findOne({ id: ipUrl.user.id});
                await userForIpAdd.ips.push(ipUrl.ip);
                await userForIpAdd.save();
                await this.ipUrlRepository.delete({id: ipUrl.id});
                return `Ip pushed to user's ip array`;
            } else {
                await this.ipUrlRepository.delete(ipUrl);
                return `Link is expired`;
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }


    async updatePassword(token: string, updatePassword: UpdatePasswordDto) {
        try {
            const userData: any = await this.jwtService.decode(token);
            const userToUpdate = await this.userRepository.findOne({id: userData.id});
            const comparePassword = await bcrypt.compareSync( updatePassword.oldPassword, userToUpdate.password);
            if (comparePassword) {
                const newPasswordCrypt = await bcrypt.hashSync(updatePassword.newPassword, +process.env.USER_PASSWORD_SALT);
                await this.userRepository.update({id: userData.id}, {password: newPasswordCrypt});
                return {
                    message: `password updated successfully!`,
                };
            } else {
                return {
                    message: `wrong old password`,
                };
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

}
