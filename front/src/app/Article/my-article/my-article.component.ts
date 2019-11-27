import {Component, OnInit} from '@angular/core';
import {Profile} from '../../Profile/profile-edit/model/profile.model';
import {ProfileEditService} from '../../Profile/profile-edit/profile-edit.service';
import {Article} from '../model/article.model';

@Component({
    selector: 'app-my-article',
    templateUrl: './my-article.component.html',
    styleUrls: [
        './my-article.component.scss',
        '../../Profile/profile-edit/profile-edit.component.scss'
    ]
})
export class MyArticleComponent implements OnInit {
    private profile: Profile;
    private articles: Article[];

    constructor(
        private profileEditService: ProfileEditService,
    ) {
        this.profile = new Profile();
    }

    ngOnInit() {
        this.getCurrentProfile();
    }

    async getCurrentProfile() {
        this.profileEditService.getCurrentProfile()
            .subscribe(
                (response: any) => {
                    this.profile = response.body.result;
                    console.log(this.profile);

                },
                (err) => {
                    console.log(err);
                });
    }
}
