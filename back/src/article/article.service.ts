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
            const newArticle = await this.articleRepository.create({
                title: articleData.title,
                content: articleData.content,
                photo: articleData.photo || `${process.env.DEV_APP_URL}/article/photo/default_article.png`,
                author,
            });
            return newArticle.save();
            // return {
            //     result: newArticle,
            // };
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
            return {
                result: await author.articles.map(el => ({
                    id: el.id,
                    title: el.title,
                    photo: el.photo,
                    createdAt: el.createdAt,
                    content: el.content.slice(0, 50),
                })),
            };
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
            };
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 400);
        }
    }
}
