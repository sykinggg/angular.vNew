import { Component, OnInit, ViewChild } from '@angular/core';
import { mapArr } from './gmapData';

import * as uuidV1 from 'uuid/v1';
declare var google: any;

@Component({
	selector: 'app-gmap',
	templateUrl: './gmap.component.html',
	styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

	public gMapArr: Array<mapArr>;

	constructor() { 
		this.gMapArr = [
			{
				config: {
					
				}
			}
		]
	}

	ngOnInit() {
	}

	defaultId() {
		this.gMapArr.map(item => {
			item.id = uuidV1();
		})
	}

	defaultMap() {

	}

}
