import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private messageSubject = new BehaviorSubject<HttpErrorResponse>(undefined);
    message$ = this.messageSubject.asObservable();

    setError(error: HttpErrorResponse) {
        this.messageSubject.next(error);
    }
}
