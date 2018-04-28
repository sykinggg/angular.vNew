import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipes',
    templateUrl: './pipes.component.html',
    styleUrls: ['./pipes.component.scss']
})
export class PipesComponent implements OnInit {

    onLineHref: string = 'https://angular.io/generated/live-examples/pipes/eplnkr.html';
    downloadHref: string = 'https://angular.io/generated/zips/pipes/pipes.zip';
    targetType: string = '_blank';

    constructor() { }

    ngOnInit() {
    }

}
