import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { address } from './json/address';

export interface IAddress {
    name: string;
    id: string;
}

export interface Iaddobj {
    province: IAddress;
    city: IAddress;
    area: IAddress;
}


@Component({
    selector: 'app-address-linkage',
    templateUrl: './address-linkage.component.html',
    styleUrls: ['./address-linkage.component.scss']
})
export class AddressLinkageComponent implements OnInit {

    public addressObj: any;

    public addObj: Iaddobj;

    @Output() addressChange = new EventEmitter<Iaddobj>();

    constructor() {}

    ngOnInit() {
        this.addressObj = address;
        this.addObj = {
            province: null,
            city: null,
            area: null
        }
    }

    provinceChange() {
        this.addObj.city = this.addressObj.city[this.addObj.province.id][0];
        this.addObj.area = this.addressObj.area[this.addObj.city.id][0];
        this.setAddress();
    }

    cityChange() {
        this.addObj.area = this.addressObj.area[this.addObj.city.id][0];
        this.setAddress();
    }

    areaChange() {
        this.setAddress();
    }

    setAddress() {
        this.addressChange.emit(this.addObj);
    }

}
