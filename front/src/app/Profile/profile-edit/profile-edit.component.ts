import {Component, OnInit} from '@angular/core';
import {ProfileEditService} from './profile-edit.service';
import {Router} from '@angular/router';
import {Profile} from './model/profile.model';
import {Environment} from "@angular/compiler-cli/src/ngtsc/typecheck/src/environment";
import {environment} from "../../../environments/environment";

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
                    this.avatar = `${environment.avatarServeUrl}${this.profile.avatar}`;
                    console.log('Avatar', this.avatar);
                    },
                (err) => {
                    console.log(err);
                });
    }




}
