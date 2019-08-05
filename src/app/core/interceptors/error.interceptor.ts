import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    private handleError(error: Error | HttpErrorResponse) {
        let message = '';

        if (error instanceof ErrorEvent) {
            // client side error
            message = `Client Error: ${error.error.message}`;
        } else if (error instanceof HttpErrorResponse) {
            // Server side error
            message = `Server Error: ${error.status}\nMessage: ${error.message}`;
        }

        // throw the error to the component to handle the display
        return throwError(error);
    }
}
