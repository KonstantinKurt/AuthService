import {
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Res,
} from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
    ApiBearerAuth,
    ApiConsumes,
    ApiImplicitFile,
} from '@nestjs/swagger';
import {ProfileService} from './profile.service';
import {AuthGuard} from '@nestjs/passport';
import {FileInterceptor} from '@nestjs/platform-express';
import {avatarOptions} from '../config/multer';

@ApiUseTags('Profile controller')
@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get profile by auth token'})
    @ApiResponse({status: 200, description: 'Profile found successfully'})
    @HttpCode(200)
    async getCurrentProfile(@Req() req): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.profileService.getCurrentProfile(token);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', avatarOptions))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'file', required: true, description: 'Profile avatar' })
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Set profile avatar'})
    @ApiResponse({status: 200, description: 'Profile avatar set successfully'})
    @HttpCode(200)
    async setAvatar(@Req() req, @UploadedFile() file): Promise<any> {
        const token = req.header(`authorization`).split(' ')[1];
        return await this.profileService.setAvatar(token, file.originalname );
    }

    @Get('/avatar/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get profile avatar'})
    @ApiResponse({status: 200, description: 'Profile avatar get successfully'})
    async serveAvatar(@Param('id') id: string, @Res() res): Promise<any> {
        res.sendFile(id, { root: 'src/public/avatars'});
    }

}
