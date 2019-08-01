import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';
import { Contact } from '../model/contact';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    constructor(private router: Router,
                private fb: FormBuilder,
                private apiService: ApiService,
                private authService: AuthService) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            name: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', [Validators.required, Validators.maxLength(12)]],
            photoURL: ['', [Validators.required, Validators.maxLength(255)]],
        });
    }

    onSubmit() {
        this.submitted = true;
        if ( this.registerForm.invalid ) {
            return;
        }
        const formvalue = this.registerForm.value;
        const contact: Contact = {
            name: formvalue.name,
            email: formvalue.email,
            password: formvalue.password,
            phone: formvalue.phone.toString(),
            photoURL: formvalue.photoURL
        };

        this.apiService.register(contact)
            .subscribe(res => {
                    const obj = JSON.stringify(res);
                    // console.log('TOKEN:', obj);
                    this.authService.setToken(obj);
                    this.router.navigate(['/login']);
                }
            );
    }
}
