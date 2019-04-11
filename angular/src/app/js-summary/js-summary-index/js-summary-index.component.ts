import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-js-summary-index',
	templateUrl: './js-summary-index.component.html',
	styleUrls: ['./js-summary-index.component.scss']
})
export class JsSummaryIndexComponent implements OnInit {

	public routerLinkArr: Array<any> = [
		{ routerName: 'base', routerLink: 'base' }
	]

	constructor() { }

	ngOnInit() {
	}

}
