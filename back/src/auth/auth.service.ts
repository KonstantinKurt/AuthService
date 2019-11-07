import {HttpException, Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {User} from './interfaces/user.interface';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
// import {UpdateEmployeeDto} from '../employee/dto/update-employee.dto';
// import {UpdateUserDTO} from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(userData: LoginDto) {
        try {
            const user = await this.userModel.findOne({email: userData.email});
            if (user) {
                const comparePassword = bcrypt.compareSync(userData.password, user.password);
                if (comparePassword) {
                    const accessPayload: JwtPayload = {
                        id: user.id,
                        name: user.name,
                        expires_in: process.env.AUTH_TOKEN_EXPIRES_IN,
                    };
                    const refreshPayload: JwtPayload = {
                        id: user.id,
                        name: user.name,
                        expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
                    };
                    const accessToken = await this.jwtService.sign(accessPayload);
                    const refreshToken = await this.jwtService.sign(refreshPayload);
                    return {
                        user_data: accessPayload,
                        access_token: `Bearer ${accessToken}`,
                        refresh_token: `Bearer ${refreshToken}`,
                    };
                } else {
                    throw new UnauthorizedException({
                        message: `Wrong password`,
                    });
                }
            } else {
                throw new NotFoundException();
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }

    }

    async register(userData: RegisterDto) {
        try {
            Logger.log(userData);
            const newUser = await new this.userModel(userData);
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
