import {
    Body,
    Controller,
    HttpCode,
    Post,
    Patch,
    Req,
    Logger,
    Get,
    Param,
    UseGuards,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiUseTags,
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse, ApiBearerAuth,
} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {IpAddressCheck} from '../decorators/check-ip-adress.decorator';
import {AuthGuard} from '@nestjs/passport';
import {UpdatePasswordDto} from './dto/update-password.dto';

@ApiUseTags('Auth controller')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Auth user'})
    @ApiResponse({status: 200, description: 'User authorized successfully!'})
    @ApiNotFoundResponse({description: 'User not found!'})
    @HttpCode(200)
    async Login(@Body() data: LoginDto, @IpAddressCheck() ip: string, @Req() req): Promise<object> {
        return  await this.authService.login(data, ip, req.headers['user-agent'].split(' ')[8], req.device.type);
    }

    @Post('/register')
    @ApiOperation({title: 'Register user'})
    @ApiCreatedResponse({description: 'User created successfully!'})
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @HttpCode(201)
    async create(@Body() userData: RegisterDto,  @IpAddressCheck() ip: string): Promise<object> {
        Logger.log(ip);
        return await this.authService.register(userData, ip);

    }

    @Get('/ip/:hash')
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Add new Ip'})
    @ApiResponse({status: 200, description: 'Ip added successfully'})
    @HttpCode(200)
    async getEmployees(@Param('hash') hash: string): Promise<any> {
        return await this.authService.newIpUpdate(hash);
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Update user password'})
    @ApiResponse({status: 204, description: 'User password updated successfully!'})
    @ApiNotFoundResponse({description: 'User not found!'})
    @HttpCode(200)
    async updateProfileByToken(@Body() userPasswordData: UpdatePasswordDto, @Req() req): Promise<object> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.authService.updatePassword(token, userPasswordData);
    }
}
