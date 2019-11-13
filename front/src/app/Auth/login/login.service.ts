import { Injectable } from '@angular/core';
import {LoginResource} from './login.resource';
import {Observable} from 'rxjs';
import {LoginDTO} from './dto/login.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private loginResource: LoginResource,
  ) { }

  login(loginData: LoginDTO): Observable<object> {
    return this.loginResource.login(loginData);
  }
}
