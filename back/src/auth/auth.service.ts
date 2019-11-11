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

// import {UpdateEmployeeDto} from '../employee/dto/update-employee.dto';
// import {UpdateUserDTO} from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
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
                        this.mailerService.sendMail(getNewIpLetter(user, ip, agent, device))
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

    async register(userData: RegisterDto, ip: number) {
        try {
            Logger.log(userData);
            const newUser = await new this.userModel(userData);
            await newUser.ip_address.push(ip);
            try {
                const newProfile = await this.profileRepository.create({
                    name: userData.name,
                    email: userData.email,
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
                error,
            }, 500);
        }
    }

    async getUserByToken(token: string) {
        try {
            const userData: any = this.jwtService.decode(token);
            return this.userModel.findOne({_id: userData.id}, '-_id').exec();
        } catch (error) {
            throw new HttpException({
                error,
            }, 500);
        }
    }

    // async updateUserByToken(userData: UpdateUserDTO, token: string) {
    //     try {
    //         const tokenData: any = await this.jwtService.decode(token);
    //         const oldPassword = await this.userModel.findOne({_id: tokenData.id}, '-_id').select('password');
    //         if (userData.password === '') {
    //             userData.password = oldPassword.password;
    //         } else {
    //             userData.password = await bcrypt.hashSync(userData.password, +process.env.USER_PASSWORD_SALT);
    //         }
    //         await this.userModel.updateOne({_id: tokenData.id}, userData, {new: true}).exec();
    //         return this.userModel.findOne({_id: tokenData.id}).exec();
    //     } catch (error) {
    //         throw new HttpException({
    //             error,
    //         }, 500);
    //     }
    // }

}
