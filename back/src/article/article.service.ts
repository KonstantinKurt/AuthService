import {HttpException, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProfileEntity} from '../profile/entity/profile.entity';
import {Repository} from 'typeorm';
import {ArticleEntity} from './entity/article.entity';
import {ArticleDto} from './dto/article.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        private readonly jwtService: JwtService,

    ) {
    }

    async create(token: string, articleData: ArticleDto) {
        try {
            const userData: any = await this.jwtService.decode(token);
            const author = await this.profileRepository.findOne({user: userData.id});
            articleData.author = await author;
            const newArticle = await this.articleRepository.create(articleData);
            newArticle.save();
            return {
                result : newArticle,
            };
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }

    async getAllProfileArticles(token: string) {
        try {
            const userData: any = await this.jwtService.decode(token);
            const author = await this.profileRepository.findOne({user: userData.id}, {relations: ['articles']});
            return author;
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }

    async deleteOwnArticle(token: string, id: string) {
        try {
            Logger.log(id);
            const userData: any = await this.jwtService.decode(token);
            const articleToDelete = await this.articleRepository.delete({id});
            return {
                message: `Article deleted successfully!`,
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }
}
