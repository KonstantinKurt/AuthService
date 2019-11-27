import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';
import {MyArticleComponent} from './my-article/my-article.component';

const routes: Routes = [
    {
        path: 'myarticles',
        component: MyArticleComponent,
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
