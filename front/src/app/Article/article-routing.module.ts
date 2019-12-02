import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';
import {MyArticleComponent} from './my-article/my-article.component';
import {CreateArticleComponent} from './create-article/create-article.component';

const routes: Routes = [
    {
        path: 'my/articles',
        component: MyArticleComponent,
    },
    {
        path: 'create',
        component: CreateArticleComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class ArticleRoutingModule {
}
