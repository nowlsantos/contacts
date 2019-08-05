import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services';
import { finalize, delay } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const loaderService = this.injector.get(LoaderService);
        loaderService.show();
        console.log('Loader Intercept:', loaderService.isLoading);

        return next.handle(req).pipe(
            delay(2000),
            finalize(() => {
                loaderService.hide();
                console.log('Loader Intercept:', loaderService.isLoading);
            })
        );
    }
}
