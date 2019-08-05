import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../core/services';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    color = 'primary';
    mode = 'indeterminate';
    value = 50;

    constructor(public loaderService: LoaderService) {}

    ngOnInit() {}
}
