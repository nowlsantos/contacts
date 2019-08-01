import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Contact has token and authorize
        if ( this.authService.isLoggedIn() ) {
            return true;
        }

        // not loggedin so redirect to login page
        this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });
        return false;
    }
}
