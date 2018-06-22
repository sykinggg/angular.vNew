import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-css-summary',
	templateUrl: './css-summary.component.html',
	styleUrls: ['./css-summary.component.scss']
})
export class CssSummaryComponent implements OnInit {

	routerLinkArr: Array<any> = [
        { routerName: 'cssMiddle', routerLink: 'cssMiddle' }
    ]

	constructor() { }

	ngOnInit() {
	}

}
