import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ProfileEntity} from './entity/profile.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfileEntity,
        ]),
    ],
    controllers: [
        ProfileController,
    ],
    providers: [
        ProfileService,
    ],
})
export class ProfileModule {
}
