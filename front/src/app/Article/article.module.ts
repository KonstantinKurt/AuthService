import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyArticleComponent} from './my-article/my-article.component';
import {ArticleRoutingModule} from './article-routing.module';
import {ProfileEditService} from '../Profile/profile-edit/profile-edit.service';
import {ProfileEditResource} from '../Profile/profile-edit/profile-edit.resource';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MyArticleService} from './my-article/my-article.service';
import {MyArticleResource} from './my-article/my-article.resource';
import {CreateArticleComponent} from './create-article/create-article.component';
import {CreateArticleService} from './create-article/create-article.service';
import {CreateArticleResource} from './create-article/create-article.resource';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { ViewArticleComponent } from './view-article/view-article.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        MyArticleComponent,
        CreateArticleComponent,
        ViewArticleComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ArticleRoutingModule,
        FormsModule,
        HttpClientModule,
        CKEditorModule
    ],
    providers: [
        ProfileEditService,
        ProfileEditResource,
        MyArticleService,
        MyArticleResource,
        CreateArticleService,
        CreateArticleResource,
    ],
})
export class ArticleModule {
}
