import {Injectable} from '@angular/core';
import {MyArticleResource} from './my-article.resource';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyArticleService {

    constructor(
        private myArticleResource: MyArticleResource,
    ) {
    }

    getAllProfileArticles(): Observable<object> {
        return this.myArticleResource.getAllProfileArticles();
    }
}
