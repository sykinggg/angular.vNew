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

    public interceptPicData;
    public screenshot() {
        this.interceptPicData = null;
        this.http.post({
            api: 'puppeteer/pic',
            data: {
                http: this.httpValue,
            },
        }).subscribe((res: any) => {
            if (!res) {
                return;
            }
            console.log(res);
            const bytes = new Uint8Array(res.data);
            let data = "";
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                data += String.fromCharCode(bytes[i]);
            }
            this.interceptPicData = "data:image/png;base64," + window.btoa(data);
        })
    }

    public interceptPdfData;
    public interceptPdf() {
        this.interceptPdfData = null;
        this.http.post({
            api: 'puppeteer/pdf',
            data: {
                http: this.httpValue,
            },
        }).subscribe((res: any) => {
            if (!res) {
                return;
            }
            const bytes = new Uint8Array(res.data);
            let data = "";
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                data += String.fromCharCode(bytes[i]);
            }
            this.interceptPdfData = {
                data: "data:image/png;base64," + window.btoa(data),
                type: 'iframe'
            };
        })
    }

}
