import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sructural-dectives',
    templateUrl: './sructural-dectives.component.html',
    styleUrls: ['./sructural-dectives.component.scss']
})
export class SructuralDectivesComponent implements OnInit {

    onLineHref: string = 'https://angular.io/generated/live-examples/structural-directives/eplnkr.html';
    downloadHref: string = 'https://angular.io/generated/zips/structural-directives/structural-directives.zip';
    targetType: string = '_blank';
    constructor() { }

    ngOnInit() {
    }

}
