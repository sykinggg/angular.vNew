import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from '../../../../node_modules/rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-huobi',
    templateUrl: './huobi.component.html',
    styleUrls: ['./huobi.component.scss']
})
export class HuobiComponent implements OnInit {

    baseUrl: string;
    textUrl: string;
    listUrl: string;
    noSignatureUrl: string;
    textSignatureUrl: string;
    balanceUrl: string;
    getOpenOrdersUrl: string;

    NO_SIGNATURE_API: Array<any>;

    constructor(
        private http: HttpClient,
        private message: NzMessageService
    ) {
        this.baseUrl = 'http://127.0.0.1:666/huobi';
        this.listUrl = '/list';
        this.textUrl = '/text';
        this.noSignatureUrl = '/noSignature';
        this.textSignatureUrl = '/signature';
        this.balanceUrl = '/v1AccountAccountsbalance';
        this.getOpenOrdersUrl = '/get_open_orders';

        this.NO_SIGNATURE_API = [
            {
                params: {
                    apiType: 'getCommonCurrencys',
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketHistoryKline',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketDetailMerged',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketTickers',
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketDepth',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketTrade',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketHistoryTrade',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                params: {
                    apiType: 'marketDetail',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                params: {
                    apiType: 'v1CommonSymbols',
                },
                data: []
            },
            {
                params: {
                    apiType: 'v1CommonTimestamp',
                },
                data: []
            }
        ];
    }

    ngOnInit() {
        // this.getHuobiList();
        // this.getNoSignature();
        this.getSignature();
    }

    getHuobiList() {
        this.http.get(this.baseUrl + this.listUrl).subscribe(res => {
            console.log(res);
        })
    }

    getNoSignature() {
        this.NO_SIGNATURE_API.map(item => {
            this.http.post(this.baseUrl + this.noSignatureUrl, item.params).subscribe((res: any) => {
                if (res.status === 'ok') {
                    this.createMessage('success', '数据获取成功!');
                    item.data = res.data;
                } else {
                    //  res['err-msg']
                    this.createMessage('error', item.params.apiType + ':' + res['err-msg']);
                }
            })
        })
    }

    signatureData = [];
    getSignature() {
        this.basePost(this.baseUrl + this.textSignatureUrl, {}, 'signatureData');
    }

    selectBalance(data, idx) {
        this.getBalance(data.id);
    }

    getBalanceData = [];
    getBalance(id) {
        this.basePost(this.baseUrl + this.balanceUrl, {account_id: id}, 'getBalanceData');
    }

    getOpenOrdersData = [];
    getOpenOrders() {
        this.basePost(this.baseUrl + this.getOpenOrdersUrl, {}, 'getBalanceData');
    }

    basePost(url, params, typeData) {
        this.http.post(url, params).subscribe((res: any) => {
            if (res.status === 'ok') {
                this.createMessage('success', '数据获取成功!');
                this[typeData] = res.data;
            } else {
                this.createMessage('error', res.msg || '数据获取失败!');
            }
        })
    }
    createMessage(type: string, msg: string) {
        this.message.create(type, msg);
    }

}
