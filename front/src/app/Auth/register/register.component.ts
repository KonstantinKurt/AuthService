import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {confirmPasswordValidator} from '../../_helpers/confirm-password-validator';
import {RegisterService} from './register.service';
import {User} from './model/user.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.scss',
        '../login/login.component.scss',
    ]
})
export class RegisterComponent implements OnInit {
    private registrationForm: FormGroup;
    private name: FormControl;
    private password: FormControl;
    private confirmPassword: FormControl;
    private email: FormControl;
    private validated: boolean;
    private user: User;
    private response: any;
    constructor(
        private registerService: RegisterService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.user = new User();
    }

     createFormControls() {
        this.name =  new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ]);
        this.email =  new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.password =  new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ]);
        this.confirmPassword =  new FormControl('', [
            Validators.required,
            confirmPasswordValidator('password')
        ]);

    }

    createForm() {
        this.registrationForm = new FormGroup({
            name: this.name,
            password: this.password,
            confirmPassword: this.confirmPassword,
            email: this.email,
        });
    }

    onSubmit() {
        if (this.registrationForm.invalid) {
            this.validated = false;
            return;
        } else {
            this.validated = true;

            this.user.name = this.name.value;
            this.user.password = this.password.value;
            this.user.email = this.email.value;
            const response = this.registerService.register(this.user);
            response.subscribe(
                (next) => {
                    console.log(next);
                    this.registerService.userNameSource.next(this.user.name);
                    this.router.navigateByUrl('/Auth/successful');
                },
                (err) => {
                    console.log(err);
                });
        }
    }

}
