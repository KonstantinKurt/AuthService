import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class RegisterDto {
    @ApiModelProperty({
            minLength: 2,
            type: String,
        },
    )
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
    readonly name: string;

    @ApiModelProperty({
            minLength: 8,
            type: String,
        },
    )
    @IsNotEmpty()
    @Length(4, 20)
    readonly password: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
