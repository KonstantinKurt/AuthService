import {Component, OnInit} from '@angular/core';
import {Profile} from '../../Profile/profile-edit/model/profile.model';
import {ProfileEditService} from '../../Profile/profile-edit/profile-edit.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-view-article',
    templateUrl: './view-article.component.html',
    styleUrls: ['./view-article.component.scss',
        '../../Profile/profile-edit/profile-edit.component.scss',
        '../../shared/navbar/navbar.component.scss',
    ]
})
export class ViewArticleComponent implements OnInit {

    private profile: Profile;

    constructor(
        private profileEditService: ProfileEditService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.getCurrentProfile();
        this.route.params.subscribe((params: Params) => {
            console.log(params);
        })
    }

    async getCurrentProfile() {
        this.profileEditService.getCurrentProfile()
            .subscribe(
                (response: any) => {
                    this.profile = response.body.result;
                },
                (err) => {
                    console.log(err);
                });
    }

}
