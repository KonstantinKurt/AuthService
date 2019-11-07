import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

    constructor() { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.email =  new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.password =  new FormControl('', [
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
            console.log(this.loginForm.value);
        }
    }
}
