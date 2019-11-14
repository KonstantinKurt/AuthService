import {
    Controller,
    Get,
    HttpCode,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import {ProfileService} from './profile.service';
import {AuthGuard} from '@nestjs/passport';

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
}
