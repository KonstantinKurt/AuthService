import {Injectable} from '@angular/core';
import {MyArticleResource} from './my-article.resource';
import {Observable} from 'rxjs';
import {Article} from '../model/article.model';

@Injectable({
    providedIn: 'root'
})
export class MyArticleService {

    constructor(
        private myArticleResource: MyArticleResource,
    ) {
    }

    getAllProfileArticles(): Observable<Article> {
        return this.myArticleResource.getAllProfileArticles();
    }

    getArticle(id: string): Observable<Article> {
        return this.myArticleResource.getArticle(id);
    }
}
