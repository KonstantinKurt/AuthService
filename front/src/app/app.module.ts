import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarModule} from './navbar/navbar.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AboutModule} from './about/about.module';
import {AuthGuard} from './_guards/auth.guard';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {UnauthorizedModule} from './unauthorized/unauthorized.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavbarModule,
        ReactiveFormsModule,
        AboutModule,
        UnauthorizedModule,
        JwtModule.forRoot({}),
    ],
    providers: [
        AuthGuard,
        JwtHelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
