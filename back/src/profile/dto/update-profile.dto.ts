import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
} from 'class-validator';

export class UpdateProfileDto {
    @ApiModelProperty()
    @IsString()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    readonly name: string;
}
