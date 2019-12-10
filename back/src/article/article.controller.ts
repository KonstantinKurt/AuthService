import {
    Body,
    Controller, Delete, Get,
    HttpCode, Logger, Param,
    Post,
    Req, Res,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import {ArticleService} from './article.service';
import {AuthGuard} from '@nestjs/passport';
import {ArticleDto} from './dto/article.dto';
import {ArticleEntity} from "./entity/article.entity";

@ApiUseTags('Article controller')
@Controller('article')
export class ArticleController {
    constructor(
        private articleService: ArticleService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get all profile articles'})
    @ApiResponse({status: 200, description: 'All profile articles'})
    @HttpCode(200)
    async getProfileArticles(@Req() req): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.articleService.getAllProfileArticles(token);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Create Article'})
    @ApiResponse({status: 200, description: 'Article created successfully'})
    @HttpCode(201)
    async create(@Req() req, @Body() articleData: ArticleDto): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.articleService.createArticle(token, articleData);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Delete own Article'})
    @ApiResponse({status: 200, description: 'Article deleted successfully'})
    @HttpCode(200)
    async deleteOwnArticle(@Param('id') id: string, @Req() req): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.articleService.deleteOwnArticle(token, id);
    }

    @Get('/photo/:id')
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get profile avatar'})
    @ApiResponse({status: 200, description: 'Profile avatar get successfully'})
    async serveAvatar(@Param('id') id: string, @Res() res): Promise<any> {
        res.sendFile(id, {root: 'src/public/articles'});
    }

    @Get('/:id')
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get article by id'})
    @ApiResponse({status: 200, description: 'Article found successfully'})
    async getArticle(@Param('id') id: string): Promise<any> {
        return this.articleService.getArticle(id);
    }





}
