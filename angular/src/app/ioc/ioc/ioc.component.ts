import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ioc',
	templateUrl: './ioc.component.html',
	styleUrls: ['./ioc.component.scss']
})
export class IocComponent implements OnInit {

	public routerLinkArr: Array<any> = [
        { routerName: 'read', routerLink: 'read' }
    ];

	constructor() { }

	ngOnInit() {
	}

}
