import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

export class ProfileDto {
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly avatar: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

