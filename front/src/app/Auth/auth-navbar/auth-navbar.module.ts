import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthNavbarComponent } from './auth-navbar.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [AuthNavbarComponent],
  exports: [
    AuthNavbarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class AuthNavbarModule { }
