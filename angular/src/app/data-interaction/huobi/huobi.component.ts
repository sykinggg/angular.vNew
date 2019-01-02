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
                title: '交易币种列表',
                params: {
                    apiType: 'getCommonCurrencys',
                },
                data: []
            },
            {
                title: '历史K线',
                params: {
                    apiType: 'marketHistoryKline',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                title: '滚动24小时交易和最优报价聚合行情(单个symbol)',
                params: {
                    apiType: 'marketDetailMerged',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                title: '全部symbol的交易行情',
                params: {
                    apiType: 'marketTickers',
                },
                data: []
            },
            {
                title: '市场深度行情（单个symbol）',
                params: {
                    apiType: 'marketDepth',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                title: '单个symbol最新成交记录',
                params: {
                    apiType: 'marketTrade',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                title: '单个symbol批量成交记录',
                params: {
                    apiType: 'marketHistoryTrade',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                title: '滚动24小时交易聚合行情(单个symbol)',
                params: {
                    apiType: 'marketDetail',
                    symbol: 'ethusdt'
                },
                data: []
            },
            {
                title: '交易品种的计价货币和报价精度',
                params: {
                    apiType: 'v1CommonSymbols',
                },
                data: []
            },
            {
                title: '查询当前系统时间',
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

    // 不需要签名的请求
    getNoSignature() {
        this.NO_SIGNATURE_API.map(item => {
            this.http.post(this.baseUrl + this.noSignatureUrl, item.params).subscribe((res: any) => {
                if (res.status === 'ok') {
                    this.createMessage('success', item.title + '数据获取成功!');
                    item.data = res.data;
                } else {
                    //  res['err-msg']
                    this.createMessage('error', item.title + item.params.apiType + ':' + res['err-msg']);
                }
            })
        })
    }

    // 账号列表
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
