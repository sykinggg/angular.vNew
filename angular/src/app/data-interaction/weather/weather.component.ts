import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iaddobj } from '../../common-directives/address-linkage/address-linkage.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

    addressStr: string;
    addressObj: Iaddobj;
    getOneObj: any;
    weatherDailyObj: any;
    weatherGridNowObj: any;
    weatherGridHourly3hObj: any;
    weatherGridHourly_historyObj: any;
    lifeSuggestionObj: any;

    constructor(
        private http: HttpClient,
        private message: NzMessageService
    ) {
        this.addressStr = '北京市';
        this.addressObj = {
            province: null,
            city: null,
            area: null
        }
        this.getOneObj = null;
        this.weatherDailyObj = null;
        this.weatherGridNowObj = null;
        this.weatherGridHourly3hObj = null;
        this.weatherGridHourly_historyObj = null;
        this.lifeSuggestionObj = null;
    }

    ngOnInit() {
    }


    getOne() {
        if (!this.addressStr) {
            this.createMessage('error', '请选择地址');
            return false;
        }
        this.http.post('http://127.0.0.1:666/weather/getOne', {
            params: {
                addressStr: this.addressStr
            }
        }).subscribe((res: any) => {
            this.getOneObj = res;
        })
    }

    weatherDaily() {
        if (!this.addressStr) {
            this.createMessage('error', '请选择地址');
            return false;
        }
        this.http.post('http://127.0.0.1:666/weather/weatherDaily', {
            params: {
                addressStr: this.addressStr
            }
        }).subscribe((res: any) => {
            this.weatherDailyObj = res;
        })
    }

    weatherGridNow() {
        this.http.post('http://127.0.0.1:666/weather/weatherGridNow', { params: null }).subscribe(res => {
            this.weatherGridNowObj = res;
        })
    }

    weatherGridHourly3h() {
        this.http.post('http://127.0.0.1:666/weather/weatherGridHourly3h', { params: null }).subscribe(res => {
            this.weatherGridHourly3hObj = res;
        })
    }

    weatherGridHourly_history() {
        this.http.post('http://127.0.0.1:666/weather/weatherGridHourly_history', { params: null }).subscribe(res => {
            this.weatherGridHourly_historyObj = res;
        })
    }

    lifeSuggestion() {
        if (!this.addressStr) {
            this.createMessage('error', '请选择地址');
            return false;
        }
        this.http.post('http://127.0.0.1:666/weather/lifeSuggestion', {
            params: {
                addressStr: this.addressStr
            }
        }).subscribe(res => {
            this.lifeSuggestionObj = res;
        })
    }

    onAddressChange(event: Iaddobj) {
        this.addressObj = event;
        this.setAddressStr(event);
    }

    setAddressStr(obj) {
        if (obj.province.name.indexOf('市') + 1) {
            this.addressStr = obj.province.name;
        } else if (obj.city.name.indexOf('市') + 1) {
            this.addressStr = obj.city.name;
        } else if (obj.area.name.indexOf('市') + 1) {
            this.addressStr = obj.area.name;
        }
    }

    createMessage(type: string, msg: string) {
        this.message.create(type, msg);
    }

}
