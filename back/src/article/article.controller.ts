import {
    Body,
    Controller, Delete, Get,
    HttpCode, Logger, Param,
    Post,
    Req,
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
    @ApiOperation({title: 'Create article'})
    @ApiResponse({status: 200, description: 'Article created successfully'})
    @HttpCode(201)
    async create(@Req() req, @Body() articleData: ArticleDto): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.articleService.create(token, articleData);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Delete own article'})
    @ApiResponse({status: 200, description: 'Article deleted successfully'})
    @HttpCode(200)
    async deleteOwnArticle(@Param('id') id: string, @Req() req): Promise<any> {
        Logger.log(id);
        const token = req.header(`authorization`).split(' ')[1];
        return await this.articleService.deleteOwnArticle(token, id);
    }

}
