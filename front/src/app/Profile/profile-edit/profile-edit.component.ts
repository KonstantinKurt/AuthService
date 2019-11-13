import {Component, OnInit} from '@angular/core';
import {ProfileEditService} from './profile-edit.service';
import {Router} from '@angular/router';
import {Profile} from './model/profile.model';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    private profile: Profile;
    constructor(
        private profileEditService: ProfileEditService,
        private router: Router,
    ) {
        this.profile = new Profile();
    }

    ngOnInit() {
        this.getCurrentProfile();
    }

    getCurrentProfile() {
        this.profileEditService.getCurrentProfile()
            .subscribe(
                (next: any) => {
                    console.log(next);

                },
                (err) => {
                    console.log(err);
                });
    }

}
