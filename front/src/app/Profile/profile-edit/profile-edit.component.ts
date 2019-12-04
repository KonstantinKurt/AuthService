import {Component, OnInit} from '@angular/core';
import {ProfileEditService} from './profile-edit.service';
import {Router} from '@angular/router';
import {Profile} from './model/profile.model';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {confirmPasswordValidator} from '../../_helpers/confirm-password-validator';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    private profile: Profile;
    private selectedImage: File;
    private changePasswordForm: FormGroup;
    private oldPassword: FormControl;
    private password: FormControl;
    private confirmPassword: FormControl;
    private validated: boolean;
    private isVisible = false;

    constructor(
        private profileEditService: ProfileEditService,
        private router: Router,
    ) {
        this.profile = new Profile();

    }

    ngOnInit() {
        this.getCurrentProfile();
        this.createFormControls();
        this.createChangePassswordForm();
    }

    createFormControls() {
        this.oldPassword = new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ]);
        this.confirmPassword = new FormControl('', [
            Validators.required,
            confirmPasswordValidator('password')
        ]);

    }

    createChangePassswordForm() {
        this.changePasswordForm = new FormGroup({
            oldPassword: this.oldPassword,
            password: this.password,
            confirmPassword: this.confirmPassword,
        });
    }

    async onSubmit() {
        if (this.changePasswordForm.invalid) {
            this.validated = false;
            return;
        } else {
            this.validated = true;
            console.log(this.password.value);
            const updatePasswordData = await {
                oldPassword: this.oldPassword.value,
                newPassword: this.password.value,
            };
            this.profileEditService.updatePassword(updatePasswordData)
                .subscribe(
                    (response: any) => {
                        if (response.status === 200) {
                            this.isVisible = true;
                            setTimeout(() => {
                                this.isVisible = false;
                            }, 5000);
                            this.changePasswordForm.reset();
                        }
                    },
                    (err) => {
                        console.log(err);
                    });
        }
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

    async onImageChanged(event: Event) {
        this.selectedImage = (event.target as HTMLInputElement).files[0];
        console.log(this.selectedImage);
    }

    async onImageUpload() {
        if (!this.selectedImage) {
            return;
        }
        const uploadData: any = new FormData();
        uploadData.append('image', this.selectedImage);
        console.log(uploadData);
        this.profileEditService.setAvatar(uploadData)
            .subscribe(
                (response: any) => {
                    this.profile.avatar = `${environment.avatarServeUrl}${response.avatarId}`;
                },
                (err) => {
                    console.log(err);
                });
    }

    async updateProfileData(param: string, mock: string[]) {
        const updateData = await {
            [param]: this.profile[param],
            [mock[0]]: ''
        };
        this.profileEditService.updateCurrentProfile(updateData)
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
