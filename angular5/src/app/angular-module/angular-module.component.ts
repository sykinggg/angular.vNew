import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-angular-module',
  	templateUrl: './angular-module.component.html',
  	styleUrls: ['./angular-module.component.scss']
})
export class AngularModuleComponent implements OnInit {

	private routerLinkArr: Array<any> = [
        { routerName: 'abstract', routerLink: 'abstract' },
		{ routerName: 'other', routerLink: 'other' },
    ]

  	constructor() { }

  	ngOnInit() {
  	}

}
