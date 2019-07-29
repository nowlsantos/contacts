import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]@[a-z0-9.-]+')]],
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.maxLength(50)]]
        });
    }

    goRegister() {
        console.log('Registering');
    }
}
