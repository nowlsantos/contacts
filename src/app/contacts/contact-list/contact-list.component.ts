import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getContacts().subscribe( contacts => {
            console.log('Contacts:', contacts);
            contacts.forEach(element => {

            });
        });
    }
}
