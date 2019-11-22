import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class RegisterDto {
    @ApiModelProperty({
            minLength: 8,
            type: String,
        },
    )
    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    readonly password: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
