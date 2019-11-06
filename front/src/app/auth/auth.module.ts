import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginService} from "./login/login.service";
import {LoginResource} from "./login/login.resource";
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavbarModule} from "../navbar/navbar.module";
import {RegisterService} from "./register/register.service";
import {RegisterResource} from "./register/register.resource";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        NavbarModule,
        ReactiveFormsModule,
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
