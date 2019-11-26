import {
    Body,
    Controller, Get,
    HttpCode, Param,
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

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Create article'})
    @ApiResponse({status: 200, description: 'Article created successful'})
    @HttpCode(200)
    async create(@Req() req, @Body() articleData: ArticleDto): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.articleService.create(token, articleData);
    }

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
}
