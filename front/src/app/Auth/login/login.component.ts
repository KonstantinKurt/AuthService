import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../register/register.service';
import {Router} from '@angular/router';
import {User} from '../register/model/user.model';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private loginForm: FormGroup;
    private email: FormControl;
    private password: FormControl;
    private validated: boolean;
    private user: User;
    private responseObject: object;

    constructor(
        private loginService: LoginService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.user = new User();
    }

    createFormControls() {
        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.password = new FormControl('', [
            Validators.required,
        ]);
    }

    createForm() {
        this.loginForm = new FormGroup({
            password: this.password,
            email: this.email,
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            alert(`invalid`);
            this.validated = false;
            return;
        } else {
            this.validated = true;
            delete this.user.name;
            this.user.email = this.email.value;
            this.user.password = this.password.value;
            console.log(this.user);
            this.loginService.login(this.user)
                .subscribe(
                (next: any) => {
                    console.log(next);
                    localStorage.setItem('token', next.body.access_token);
                    this.router.navigateByUrl('/Profile/edit');
                },
                (err) => {
                    console.log(err);
                });
        }
    }
}
