import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from 'src/app/model/contact';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    register(contact: Contact) {
        return this.http.post(`${this.baseUrl}/register`, contact);
    }

    login({email, password}) {
        return this.http.post(`${this.baseUrl}/authentication`, {email, password});
    }

    getContact(id: string) {
        return this.http.get(`${this.baseUrl}/contacts/${id}`);
    }

    getContacts() {
        return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
    }

    update(id: string, contact: Contact) {
        return this.http.put(`${this.baseUrl}/contacts/${id}`, contact);
    }

    delete(id: string) {
        return this.http.delete<Contact>(`${this.baseUrl}/contacts/${id}`);
    }
}
