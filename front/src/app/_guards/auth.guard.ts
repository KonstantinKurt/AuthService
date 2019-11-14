import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtHelper: JwtHelperService,
        private router: Router,
    ) {
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigateByUrl('unauthorized');
            return false;
        }
        return true;
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('auth_token');
        if (!token || this.jwtHelper.isTokenExpired(token)) {
            return false;
        }
        return true;
    }
}
