import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../layout/http.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-puppeteer',
    templateUrl: './puppeteer.component.html',
    styleUrls: ['./puppeteer.component.scss']
})
export class PuppeteerComponent implements OnInit {

    private httpValue: string;

    constructor(
        private http: HttpService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
    }

    public screenshot() {
        this.http.post({
            api: '/puppeteer/pic',
            data: {
                http: this.httpValue,
            },
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    public interceptPdf() {
        this.http.post({
            api: '/puppeteer/pdf',
            data: {
                http: this.httpValue,
            },
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

}
