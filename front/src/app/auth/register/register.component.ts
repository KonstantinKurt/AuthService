import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../helpers/confirm-password-validator";

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
    private validated: Boolean;

    constructor() {
    }

    ngOnInit() {
        console.log(this.validated);
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.name = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ]);
        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ]);
        this.confirmPassword = new FormControl('', [
            Validators.required,
            confirmPasswordValidator('password')
        ])
    }

    createForm() {
        this.registrationForm = new FormGroup({
            name: this.name,
            password: this.password,
            confirmPassword: this.confirmPassword,
            email: this.email,
        })
    }

    onSubmit() {
        if (this.registrationForm.invalid) {
            alert(`invalid`);
            this.validated = false;
            return;
        }
        else{
            this.validated = true;
            console.log(this.registrationForm.value);
        }
    }
}
