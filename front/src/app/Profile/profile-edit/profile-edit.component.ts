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
    private avatar: any;

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
                    this.profile = next;
                    console.log(this.profile);
                    },
                (err) => {
                    console.log('22222222222222222222222222222222', err);
                });
    }

    getAvatar(id: string) {
        this.profileEditService.getAvatar(id)
            .subscribe(
                (next: any) => {
                    console.log('next', next);
                    this.avatar = next;
                    console.log('Avatar', this.avatar);

                },
                (err) => {
                    console.log('!!!!!!!!!!!!!!!!!!', err);
                });
    }



}
