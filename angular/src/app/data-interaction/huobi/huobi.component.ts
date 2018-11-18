import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from '../../../../node_modules/rxjs/operators';

@Component({
    selector: 'app-huobi',
    templateUrl: './huobi.component.html',
    styleUrls: ['./huobi.component.scss']
})
export class HuobiComponent implements OnInit {

    baseUrl: string;
    textUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = 'http://127.0.0.1:666/huobi';
        this.textUrl = '/text'
    }

    ngOnInit() {
        this.getHuobiList();
    }

    getHuobiList() {
        console.log('huobiInit');
        this.http.get(this.baseUrl + this.textUrl).subscribe(res => {
            console.log(res);
        })
    }

}
