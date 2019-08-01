import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { Contact } from '../model/contact';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

    createForm: FormGroup;
    submitted = false;

    constructor(private router: Router,
                private fb: FormBuilder,
                private apiService: ApiService) { }

    ngOnInit() {
        this.createForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            name: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', [Validators.required, Validators.maxLength(12)]],
            photoUrl: ['', [Validators.maxLength(255)]],
        });
    }

    onSubmit() {
        this.submitted = true;
        if ( this.createForm.invalid ) {
            return;
        }
        const formvalue = this.createForm.value;
        const contact: Contact = {
            name: formvalue.name,
            email: formvalue.email,
            password: formvalue.password,
            phone: formvalue.phone.toString(),
            photoUrl: formvalue.photoUrl
        };

        this.apiService.register(contact)
            .subscribe(res => {
                    /* const obj = JSON.stringify(res); */
                    this.router.navigate(['/home']);
                }
            );
    }

}
