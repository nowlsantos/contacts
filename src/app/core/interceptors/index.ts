import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-inteceptor';

export const InterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
];
