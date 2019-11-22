import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class UpdatePasswordDto {
    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    @IsNotEmpty()
    @IsString()
    readonly oldPassword: string;

    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    @IsNotEmpty()
    @IsString()
    readonly newPassword: string;
}
