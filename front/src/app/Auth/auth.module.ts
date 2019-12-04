import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginService} from './login/login.service';
import {LoginResource} from './login/login.resource';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthNavbarModule} from './auth-navbar/auth-navbar.module';
import {RegisterService} from './register/register.service';
import {RegisterResource} from './register/register.resource';
import {HttpClientModule} from '@angular/common/http';
import {SuccessfulComponent} from './successful/successful.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        SuccessfulComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        AuthNavbarModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        LoginService,
        LoginResource,
        RegisterService,
        RegisterResource,
    ],
    exports: [
    ],
})
export class AuthModule {
}
