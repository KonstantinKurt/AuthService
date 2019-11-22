import {HttpException, Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {User} from './interfaces/user.interface';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';
import {Repository} from 'typeorm';
import {checkIpInDB} from '../helpers/checkip-db.helper';
import {MailerService} from '@nest-modules/mailer';
import {getNewIpLetter} from '../helpers/newip-letter.helper';
import {IpUrl} from './interfaces/ip-url.interface';
import {getHash} from '../helpers/hash-gen.helper';
import {UpdatePasswordDto} from './dto/update-password.dto';

// import {UpdateEmployeeDto} from '../employee/dto/update-employee.dto';
// import {UpdateUserDTO} from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        @InjectModel('IpUrl')
        private readonly ipUrlModel: Model<IpUrl>,
        private readonly jwtService: JwtService,
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        private readonly mailerService: MailerService,
    ) {
    }

    async login(userData: LoginDto, ip: number, agent: string, device: any) {
        try {
            const user = await this.userModel.findOne({email: userData.email});
            if (user) {
                const comparePassword = bcrypt.compareSync(userData.password, user.password);
                if (comparePassword) {
                    if (!checkIpInDB(user, ip)) {
                        const cryptIp = getHash(15);
                        const link = `${process.env.DEV_APP_URL}/ip/${cryptIp}`;
                        const newIpUrl = await new this.ipUrlModel({hash: cryptIp, user: user._id, ip}).save();
                        await this.mailerService.sendMail(getNewIpLetter(user, ip, agent, device, link))
                            .catch(err => {
                                Logger.log(`MAILER ERROR`);
                                Logger.log(err);
                            });

                    }
                    const accessPayload: JwtPayload = {
                        id: user._id,
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

    async register(userData: RegisterDto, ip: number) {
        try {
            const newUser = await new this.userModel(userData);
            await newUser.ip_address.push(ip);
            try {
                Logger.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${newUser._id}`);
                const newProfile = await this.profileRepository.create({
                    name: userData.name,
                    email: userData.email,
                    user: newUser._id.toString(),
                });
                await this.profileRepository.save(newProfile);
            } catch (error) {
                throw new HttpException({
                    error,
                }, 500);
            }
            const resultUser = await newUser.save();
            return {
                user: resultUser._id,
            };
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
            const ipUrl = await this.ipUrlModel.findOne({hash, createdAt: {$lte: expiredParam}}).exec();
            if (ipUrl) {
                await this.userModel.updateOne({_id: ipUrl.user}, {$push: {ip_address: ipUrl.ip}}).exec();
                await this.ipUrlModel.deleteOne({_id: ipUrl._id}).exec();
                return `Ip pushed to user's ip`;
            } else {
                await this.ipUrlModel.deleteOne({hash}).exec();
                return `Link is expired`;
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

    async updatePassword(token: string, updatePasswordDto: UpdatePasswordDto) {
        try {
            const userData: any = await this.jwtService.decode(token);

            Logger.log(`Service`);
            Logger.log(userData);
            return {
                data: userData,
            };
        } catch (error) {
            Logger.log(error.message);
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

}
