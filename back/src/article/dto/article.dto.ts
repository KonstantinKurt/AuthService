import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    Length,
} from 'class-validator';
import {ProfileEntity} from '../../profile/entity/profile.entity';

export class ArticleDto {
    @ApiModelProperty({
        minLength: 8,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @Length(8)
    readonly name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @ApiModelProperty()
    readonly photo: string;

    @ApiModelProperty()
    author: ProfileEntity;
}
