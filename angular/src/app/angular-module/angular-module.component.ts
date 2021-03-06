import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-angular-module',
  	templateUrl: './angular-module.component.html',
  	styleUrls: ['./angular-module.component.scss']
})
export class AngularModuleComponent implements OnInit {

	public routerLinkArr: Array<any> = [
        { routerName: 'abstract', routerLink: 'abstract' },
		{ routerName: 'other', routerLink: 'other' },
		{ routerName: 'dependency', routerLink: 'dependency' },
		{ routerName: 'diskill', routerLink: 'diskill' },
		{ routerName: 'decorator', routerLink: 'decorator' }
    ]

  	constructor() { }

  	ngOnInit() {
  	}

}
