import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AboutComponent} from './about/about.component';
import {TestMarkupComponent} from './test-markup/test-markup.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: './Auth/auth.module#AuthModule'
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
    },
    {
        path: 'test',
        component: TestMarkupComponent,
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: './Profile/profile.module#ProfileModule'
    },
    {
        path: 'article',
        canActivate: [AuthGuard],
        loadChildren: './Article/article.module#ArticleModule'
    },
];

@NgModule({
    providers: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
