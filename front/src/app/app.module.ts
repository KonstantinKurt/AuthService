import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {NavbarModule} from "./navbar/navbar.module";
import {ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from './about/about.component';
import {AboutModule} from "./about/about.module";

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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
