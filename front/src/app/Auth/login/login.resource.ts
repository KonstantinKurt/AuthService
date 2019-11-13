import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginDTO} from './dto/login.dto';

@Injectable()
export class LoginResource {
    private readonly hostUrl = `${environment.hostUrl}auth/login`;
    private readonly httpOptions: object;

    constructor(
        private httpClient: HttpClient,
    ) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',

            }),
            observe: 'response',

        };
    }
    login(loginData: LoginDTO): Observable<object> {
        console.log('Resource', this.hostUrl);
        console.log('ResourceData', loginData);
        return this.httpClient.post<object>(this.hostUrl, loginData, this.httpOptions);
    }
}
