import {Injectable} from '@angular/core';
import {CreateArticleResource} from './create-article.resource';
import {Observable} from 'rxjs';
import {Article} from '../model/article.model';

@Injectable({
    providedIn: 'root'
})
export class CreateArticleService {

    constructor(
        private articleResource: CreateArticleResource,
    ) {
    }

    createArticle(article: Article): Observable<object> {
        return this.articleResource.createArticle(article);
    }
}
