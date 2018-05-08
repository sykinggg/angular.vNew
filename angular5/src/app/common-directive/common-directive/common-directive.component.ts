import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-common-directive',
	templateUrl: './common-directive.component.html',
	styleUrls: ['./common-directive.component.scss']
})
export class CommonDirectiveComponent implements OnInit {

	private routerLinkArr: Array<any> = [
        { routerName: 'smallModule', routerLink: 'smallModule' }
    ]

	constructor() { }

	ngOnInit() {
	}

}
