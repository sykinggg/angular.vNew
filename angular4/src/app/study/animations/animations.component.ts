import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-animations',
    templateUrl: './animations.component.html',
    styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit {
    onLineHref = 'https://angular.io/generated/live-examples/animations/eplnkr.html';
    downloadHref = 'https://angular.io/generated/zips/animations/animations.zip';
    listAnimation = 'https://www.w3.org/TR/css3-transitions/#animatable-properties';
    cssChange = 'https://www.w3.org/TR/css3-transitions';
    targetType = '_blank'
    constructor() { }

    ngOnInit() {
    }

}
