import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register/register.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {
  private userName: BehaviorSubject<string>;

  constructor(
      private registerService: RegisterService,
      private router: Router,
  ) {}

  ngOnInit() {
    this.userName = this.registerService.userNameSource;
  }
  loginRedirect() {
    this.router.navigateByUrl('auth/login');
  }

}
