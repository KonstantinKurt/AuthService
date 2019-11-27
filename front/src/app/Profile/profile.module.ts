import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileNavbarComponent} from '../profile-navbar/profile-navbar.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileEditService} from './profile-edit/profile-edit.service';
import {ProfileEditResource} from './profile-edit/profile-edit.resource';
import { ProfileSidebarComponent } from '../profile-sidebar/profile-sidebar.component';
import { AvatarChangeSizeDirective } from './profile-edit/directives/avatar-change-size.directive';
import { ChangePasswordDirective } from './profile-edit/directives/change-password.directive';
import {ClockComponent} from '../clock/clock.component';



@NgModule({
    declarations: [
        ProfileNavbarComponent,
        ProfileEditComponent,
        ProfileSidebarComponent,
        ClockComponent,
        AvatarChangeSizeDirective,
        ChangePasswordDirective,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
      ProfileEditService,
      ProfileEditResource,
    ],
})
export class ProfileModule {
}
