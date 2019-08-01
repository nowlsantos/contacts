import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            share()
        );

    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router,
                public authService: AuthService) {}

    createContact() {
        this.router.navigate(['/new']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
