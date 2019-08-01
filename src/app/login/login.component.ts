import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private apiService: ApiService,
                private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.maxLength(50)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;
        console.log('IsValid:', this.loginForm.invalid);

        if ( this.loginForm.invalid ) {
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
            });
    }
}
