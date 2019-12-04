import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AboutModule} from './About/about.module';
import {AuthGuard} from './_guards/auth.guard';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {UnauthorizedModule} from './common/unauthorized/unauthorized.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
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
