import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class ArticleDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @ApiModelProperty()
    readonly photo: string;
}
