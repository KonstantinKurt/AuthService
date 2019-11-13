import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileNavbarComponent} from './profile-navbar/profile-navbar.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ProfileRoutingModule} from './profile-routing.module';


@NgModule({
    declarations: [
        ProfileNavbarComponent,
        ProfileEditComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
    ]
})
export class ProfileModule {
}
