import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Contact } from '../model/contact';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    contact$: Observable<Contact[]>;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.contact$ = this.apiService.getContacts();
        // this.contact$.subscribe(contact => console.log(contact));
    }
}
