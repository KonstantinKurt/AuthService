import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entity/user.entity';
import {Request, Response} from 'express';
import {Repository} from 'typeorm';

@Injectable()
export class CheckEmailMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
    }

    async use(req: Request, res: Response, next: () => void) {
        const email = req.body.email;
        const checkEmailExistance = await this.userRepository.findOne({email}, { select: ['email'] });
        Logger.log(checkEmailExistance);
        if (checkEmailExistance) {
            res.status(409).json({
                message: `Email is already exists`,
            });
        } else {
            next();
        }
    }
}
