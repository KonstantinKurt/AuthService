import {Component, OnInit} from '@angular/core';
import {ProfileEditService} from './profile-edit.service';
import {Router} from '@angular/router';
import {Profile} from './model/profile.model';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    private profile: Profile;
    private avatar: string;
    private selectedImage: File;

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
                (response: any) => {
                    this.profile = response;
                    this.avatar = this.profile.avatar;
                },
                (err) => {
                    console.log(err);
                });
    }

    onImageChanged(event: Event) {
        this.selectedImage = (event.target as HTMLInputElement).files[0];
        console.log(this.selectedImage);
    }

    async onImageUpload() {
        if (!this.selectedImage) {
            return;
        }
        const uploadData: any = new FormData();
        await uploadData.append('image', this.selectedImage);
        console.log(uploadData);
        this.profileEditService.setAvatar(uploadData)
            .subscribe(
                (response: any) => {
                   this.avatar = `${environment.avatarServeUrl}${response.avatarId}`;
                },
                (err) => {
                    console.log(err);
                });
    }


}
