import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-math-index',
    templateUrl: './math-index.component.html',
    styleUrls: ['./math-index.component.scss']
})
export class MathIndexComponent implements OnInit {

    public routerLinkArr: Array<any> = [
		{ routerName: 'firstGrade', routerLink: 'firstGrade' },
	]

    constructor() { }

    ngOnInit() {
    }

}
