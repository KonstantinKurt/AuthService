import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Article} from '../model/article.model';

@Injectable()
export class CreateArticleResource {
    private readonly hostUrl = `${environment.hostUrl}article`;
    private readonly httpOptions: object;
    private readonly httpOptionsFormData: object;
    private readonly token: string;

    constructor(
        private httpClient: HttpClient,
    ) {
        this.token = localStorage.getItem('auth_token');
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: this.token,
            }),
            observe: 'response',
        };
        this.httpOptionsFormData = {
            headers: new HttpHeaders({
                authorization: this.token
            }),
        };
    }

     createArticle(article: Article): Observable<object> {
        return this.httpClient.post(this.hostUrl, article, this.httpOptions);
    }


}
