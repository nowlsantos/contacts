import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../model/contact';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    @Input() contact: Contact;
    photoURL: string;

    constructor() { }

    ngOnInit() {
        this.photoURL = `../../assets/profiles/${this.contact.photoUrl}`;
    }

}
