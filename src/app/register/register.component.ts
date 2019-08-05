import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, AuthService } from '../core/services';
import { Contact } from '../model/contact';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    invalid: boolean;
    durationInSeconds = 3;

    constructor(private router: Router,
                private fb: FormBuilder,
                private apiService: ApiService,
                private authService: AuthService,
                private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            name: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', [Validators.required, Validators.maxLength(20)]],
            photoUrl: [''],
        });
    }

    onSubmit() {
        this.submitted = true;
        this.invalid = this.registerForm.invalid;

        if ( this.invalid ) {
            this.openSnackBar();
            return;
        }
        const formvalue = this.registerForm.value;
        const contact: Contact = {
            name: formvalue.name,
            email: formvalue.email,
            password: formvalue.password,
            phone: formvalue.phone.toString(),
            photoUrl: formvalue.photoUrl
        };

        this.apiService.register(contact)
            .subscribe(res => {
                    const obj = JSON.stringify(res);
                    this.authService.setToken(obj);
                    this.router.navigate(['/login']);
                }
            );
    }

    openSnackBar() {
        const config: MatSnackBarConfig = {
            panelClass: ['sb-config-error', 'sb-config-success'],
            duration: 3000
        };

        const message = this.getMessage();
        const snackbar = this.snackbar.open(message, 'Close', config);

        snackbar.afterDismissed().subscribe(_ => {
            this.submitted = false;
        });
    }

    getMessage(): string {
        const email = this.registerForm.get('email');
        const name = this.registerForm.get('name');
        const password = this.registerForm.get('password');
        const phone = this.registerForm.get('phone');
        let message = '';

        switch ( true ) {
            case email.invalid && email.hasError('required'):
                message = 'You must enter a value';
                break;

            case email.invalid && email.hasError('email'):
                message = 'Not a valid email';
                break;

            case name.invalid:
                message = 'name at least 6 characters';
                break;

            case password.invalid:
                message = 'Password at least 6 characters';
                break;

            case phone.invalid:
                message = 'Mobile number is required';
                break;

            default:
                message = 'Please fill in the required fields';
        }

        return message;
    }
}
