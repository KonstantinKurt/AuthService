import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Article} from '../Article/model/article.model';
import {Observable} from 'rxjs';

export class ArticleResolver implements Resolve<Article> {


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
       return
    }
}
