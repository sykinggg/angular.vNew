import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-chart-index',
	templateUrl: './chart-index.component.html',
	styleUrls: ['./chart-index.component.scss']
})
export class ChartIndexComponent implements OnInit {

	public routerLinkArr: Array<any>;

	constructor() { 
		this.routerLinkArr = [
			{ routerName: 'chart', routerLink: 'eChart' },
			{ routerName: 'highChart', routerLink: 'highChart' },
			// { routerName: 'd3', routerLink: 'd3' },
		]
	}

	ngOnInit() {
	}

}
