import {Injectable} from '@angular/core';
import {ProfileEditResource} from './profile-edit.resource';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileEditService {

    constructor(
        private profileEditResource: ProfileEditResource
    ) {
    }

    getCurrentProfile(): Observable<object> {
        return this.profileEditResource.getCurrentProfile();
    }

    updateCurrentProfile(updateData: object) {
        return this.profileEditResource.updateCurrentProfile(updateData);
    }

    setAvatar(uploadData: FormData): Observable<object> {
        return this.profileEditResource.setAvatar(uploadData);
    }

    updatePassword(updatePasswordData: object): Observable<object> {
        return this.profileEditResource.updatePassword(updatePasswordData);
    }

}
