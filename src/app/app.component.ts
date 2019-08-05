import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorService, LoaderService } from './core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private errorService: ErrorService,
                public loaderService: LoaderService,
                private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.errorService.message$.subscribe((error: HttpErrorResponse) => {
            // console.log('Error Message from App', error);
            if ( error !== undefined ) {
                this.openDialog(`Error ${error.message}`);
            }
        });
    }

    openDialog(message: string): void {
        const config: MatSnackBarConfig = {
            duration: 5000
        };

        const snackbar = this.snackbar.open(message, '', config);

        snackbar.afterDismissed().subscribe(_ => {
            message = '';
        });
    }
}
