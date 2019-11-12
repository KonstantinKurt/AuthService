import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register/register.service';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {
  private userName: any;
  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.userName = this.registerService.userNameSource;
  }

}
