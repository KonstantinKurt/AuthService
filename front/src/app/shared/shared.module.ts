import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClockComponent} from './clock/clock.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {SidebarComponent} from './sidebar/sidebar.component';



@NgModule({
  declarations: [
      ClockComponent,
      NavbarComponent,
      UnauthorizedComponent,
      SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClockComponent,
    NavbarComponent,
    UnauthorizedComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
