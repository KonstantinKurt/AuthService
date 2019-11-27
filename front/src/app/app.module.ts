import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarModule} from './auth-navbar/navbar.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AboutModule} from './about/about.module';
import {AuthGuard} from './_guards/auth.guard';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {UnauthorizedModule} from './unauthorized/unauthorized.module';
import { TestMarkupComponent } from './test-markup/test-markup.component';

@NgModule({
    declarations: [
        AppComponent,
        TestMarkupComponent,
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
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
