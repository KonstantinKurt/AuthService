import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from '../common/navbar/navbar.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileEditService} from './profile-edit/profile-edit.service';
import {ProfileEditResource} from './profile-edit/profile-edit.resource';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { AvatarChangeSizeDirective } from './profile-edit/directives/avatar-change-size.directive';
import { ChangePasswordDirective } from './profile-edit/directives/change-password.directive';
import {ClockComponent} from '../common/clock/clock.component';



@NgModule({
    declarations: [
        NavbarComponent,
        ProfileEditComponent,
        SidebarComponent,
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
