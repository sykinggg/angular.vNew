import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../layout/http.service';
import { NzMessageService } from 'ng-zorro-antd';

// https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v1.11.0&show=api-pagepdfoptions
export interface IPdf {
    // pdf文件保存的路径
    path?: string;
    // 页面渲染的缩放。默认是1
    scale?: number;
    // 页面宽度, 接受带单位的字符串
    width?: string;
}

// https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v1.11.0&show=api-pagescreenshotoptions
export interface IPic {
    // 截图保存路径。截图图片类型将从文件扩展名推断出来
    path?: string;
    // 指定截图类型, 可以是 jpeg 或者 png。默认 'png'.
    type?: string;
    // 图片质量, 可选值 0-100. png 类型不适用
    quality?: number;
    // 如果设置为true，则对完整的页面（需要滚动的部分也包含在内）。默认是false
    fullPage?: boolean;
    // 指定裁剪区域
    clip?: {
        // 裁剪区域相对于左上角（0， 0）的x坐标
        x?: number;
        // 裁剪区域相对于左上角（0， 0）的y坐标
        y?: number;
        // 裁剪的宽度
        width?: number;
        // 裁剪的高度
        height?: number;
    }
    // 隐藏默认的白色背景，背景透明。默认不透明
    omitBackground?: boolean;
    // 图像的编码可以是 base64 或 binary
    encoding?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IGetData {
    selector?: string;
    attr?: string;
    name?: string;
}

@Component({
    selector: 'app-puppeteer',
    templateUrl: './puppeteer.component.html',
    styleUrls: ['./puppeteer.component.scss']
})
export class PuppeteerComponent implements OnInit {

    public httpValue: string;
    public radioValue: string;
    public waitFor: any;

    public pdfObj: IPdf = {
        path: '',
        scale: 1,
        width: ''
    };
    public picObj: IPic = {
        path: '',
        type: '',
        quality: 0,
        fullPage: true,
        omitBackground: true,
        encoding: 'base64'
    };
    public getData: IGetData = {
        selector: '',
        attr: '',
        name: ''
    }
    public getDataArr: IGetData[] = [];

    constructor(
        public http: HttpService,
        public message: NzMessageService
    ) {
        this.radioValue = 'pdf';
        this.waitFor = 1000;
        this.addGetDataArr();
    }

    ngOnInit() {
        // this.getMm131BasicClass();
    }

    public interceptPicData;
    public screenshot() {
        this.interceptPicData = null;

        this.http.post({
            api: 'puppeteer/pic',
            data: {
                http: this.httpValue,
                waitFor: this.waitFor,
                option: this.picObj,
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
                waitFor: this.waitFor,
                option: this.pdfObj,
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

    public getDataClickData;
    public getDataClick() {
        this.getDataClickData = null;
        this.http.post({
            api: 'puppeteer/getData',
            data: {
                http: this.httpValue,
                waitFor: this.waitFor,
                option: this.getDataArr,
            },
        }).subscribe((res: any) => {
            if (!res) {
                return;
            }
            this.getDataClickData = res;
        })
    }

    public deleteGetDataArr(idx) {
        this.getDataArr.splice(idx, 1);
    }

    public addGetDataArr() {
        this.getDataArr.push(JSON.parse(JSON.stringify(this.getData)));
    }


    // getMm131BasicClass
    public getMm131BasicClassData;
    public getMm131BasicClass() {
        this.http.get({
            api: 'puppeteer/getMm131BasicClass'
        }).subscribe((res: any) => {
            console.log(res);
            this.getMm131BasicClassData = res;
        })
    }
    public choiceData;
    public getMm131GetDetailsData;
    public getMm131GetDetails() {
        this.http.post({
            api: 'puppeteer/getMm131GetDetails',
            data: this.choiceData
        }).subscribe((res: any) => {
            console.log(res);
            this.getMm131GetDetailsData = res;
        })
    }


    // girl 13
    public setGirl13GetDetails() {
        this.http.post({
            api: 'puppeteer/setGirl13GetDetails',
            data: this.choiceData
        }).subscribe((res: any) => {
            console.log(res);
        })
    }
    public getGirl13GetDetailsData;
    public getGirl13GetDetails() {
        this.http.post({
            api: 'puppeteer/getGirl13GetDetails',
            data: this.choiceData
        }).subscribe((res: any) => {
            console.log(res);
            this.getGirl13GetDetailsData = res;
        })
    }


    // Mzitu
    public setMzituUrlGetDetails() {
        this.http.post({
            api: 'puppeteer/setMzituUrlGetDetails',
            data: this.choiceData
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

}
