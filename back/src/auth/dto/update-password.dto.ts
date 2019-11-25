import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    Min, Length
} from 'class-validator';

export class UpdatePasswordDto {
    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    @IsNotEmpty()
    @Length(8, 20)
    @IsString()
    readonly oldPassword: string;

    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    readonly newPassword: string;
}
