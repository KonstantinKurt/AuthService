import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Article} from '../model/article.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MyArticleResource {
    private readonly hostUrl = `${environment.hostUrl}article`;
    private readonly httpOptions: object;
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
    }

    getAllProfileArticles(): Observable<Article> {
        return this.httpClient.get<Article>(this.hostUrl, this.httpOptions);
    }

    getArticle(id: string): Observable<Article> {
        const httpOptions1 = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: this.token,
            }),
            observe: 'response' as 'body',
            params: new HttpParams().set('id', id),
        };
        return this.httpClient.get<Article>(this.hostUrl, httpOptions1);

    }

}
