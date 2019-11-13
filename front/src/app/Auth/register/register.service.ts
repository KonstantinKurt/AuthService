import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegisterDTO} from './dto/register.dto';
import {RegisterResource} from './register.resource';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userNameSource = new BehaviorSubject('default name');
  constructor(
    private registerResource: RegisterResource,
  ) { }

  register(registerData: RegisterDTO): Observable<object> {
    return this.registerResource.register(registerData);
  }
}
