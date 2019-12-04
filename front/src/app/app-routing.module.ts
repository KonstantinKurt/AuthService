import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {UnauthorizedComponent} from './common/unauthorized/unauthorized.component';
import {AboutComponent} from './About/about.component';


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
