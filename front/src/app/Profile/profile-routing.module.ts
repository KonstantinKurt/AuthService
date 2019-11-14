import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {AuthGuard} from '../_guards/auth.guard';
const routes: Routes = [
    {
        path: '',
        component: ProfileEditComponent,
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
export class ProfileRoutingModule {
}
