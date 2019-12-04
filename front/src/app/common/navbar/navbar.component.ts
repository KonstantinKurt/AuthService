import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profile} from '../../Profile/profile-edit/model/profile.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.scss',
    ]
})
export class NavbarComponent implements OnInit {
    @Input()
    private profile: Profile;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('auth/login');
    }


}
