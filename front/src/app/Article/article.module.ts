import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyArticleComponent} from './my-article/my-article.component';
import {ArticleRoutingModule} from './article-routing.module';
import {ProfileNavbarComponent} from '../profile-navbar/profile-navbar.component';
import {ProfileSidebarComponent} from '../profile-sidebar/profile-sidebar.component';
import {ProfileEditService} from '../Profile/profile-edit/profile-edit.service';
import {ProfileEditResource} from '../Profile/profile-edit/profile-edit.resource';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MyArticleService} from './my-article/my-article.service';


@NgModule({
    declarations: [
        MyArticleComponent,
        ProfileNavbarComponent,
        ProfileSidebarComponent,
    ],
    imports: [
        CommonModule,
        ArticleRoutingModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [
        ProfileEditService,
        ProfileEditResource,
        MyArticleService,
        MyArticleComponent,
    ],
})
export class ArticleModule {
}
