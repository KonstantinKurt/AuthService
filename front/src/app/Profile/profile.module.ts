import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileEditService} from './profile-edit/profile-edit.service';
import {ProfileEditResource} from './profile-edit/profile-edit.resource';
import { AvatarChangeSizeDirective } from './profile-edit/directives/avatar-change-size.directive';
import { ChangePasswordDirective } from './profile-edit/directives/change-password.directive';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations: [
        ProfileEditComponent,
        AvatarChangeSizeDirective,
        ChangePasswordDirective,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
      ProfileEditService,
      ProfileEditResource,
    ],
})
export class ProfileModule {
}
