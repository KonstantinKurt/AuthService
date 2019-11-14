import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProfileEditResource {
    private readonly hostUrl = `${environment.hostUrl}profile`;
    private readonly httpOptions: object;
    private readonly token: string;
    constructor(
        private httpClient: HttpClient,
    ) {
        this.token = localStorage.getItem('auth_token');
        this.httpOptions = {
             headers: new HttpHeaders({
                'Content-Type':  'application/json',
                authorization: this.token
            }),
        };
    }

    getCurrentProfile(): Observable<object> {
        return this.httpClient.get<object>(this.hostUrl, this.httpOptions);
    }
}
