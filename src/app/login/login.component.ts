import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, AuthService, ErrorService } from '../core/services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    invalid: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private apiService: ApiService,
        public authService: AuthService,
        private snackBar: MatSnackBar,
        private errorService: ErrorService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;
        this.invalid = this.loginForm.invalid;

        if (this.invalid) {
            this.openSnackBar();
            return;
        }
        const formvalue = this.loginForm.value;
        const contact = {
            email: formvalue.email,
            password: formvalue.password
        };

        this.apiService.login(contact)
            .subscribe(res => {
                const obj = JSON.stringify(res);
                this.authService.setToken(obj);
                this.router.navigate(['/home']);
            },
                (error) => {
                    this.errorService.setError(error);
                });
    }

    openSnackBar() {
        const config: MatSnackBarConfig = {
            panelClass: ['sb-config-error'],
            duration: 3000
        };

        const message = this.getMessage();
        const snackbar = this.snackBar.open(message, 'Close', config);

        snackbar.afterDismissed().subscribe(_ => {
            this.submitted = false;
        });
    }

    getMessage(): string {
        const email = this.loginForm.get('email');
        const password = this.loginForm.get('password');
        let message = '';

        switch (true) {
            case email.invalid && email.hasError('required'):
                message = 'You must enter a value';
                break;

            case email.invalid && email.hasError('email'):
                message = 'Not a valid email';
                break;

            case password.invalid:
                message = 'Password at least 6 characters';
                break;

            default:
                message = 'Please fill in the required fields';
        }

        return message;
    }
}
