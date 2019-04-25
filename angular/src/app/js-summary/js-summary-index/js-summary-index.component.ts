import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-js-summary-index',
	templateUrl: './js-summary-index.component.html',
	styleUrls: ['./js-summary-index.component.scss']
})
export class JsSummaryIndexComponent implements OnInit {

	public routerLinkArr: Array<any> = [
		{ routerName: 'sum', routerLink: 'sum' },
		{ routerName: 'base', routerLink: 'base' },
		{ routerName: 'AI', routerLink: 'AI' },
	]

	constructor() { }

	ngOnInit() {
	}

}
