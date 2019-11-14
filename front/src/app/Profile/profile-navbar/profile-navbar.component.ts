import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profile-navbar',
    templateUrl: './profile-navbar.component.html',
    styleUrls: [
        './profile-navbar.component.scss',
        '../../navbar/navbar.component.scss'
    ]
})
export class ProfileNavbarComponent implements OnInit {
    private currentUser = 'TEST';

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
