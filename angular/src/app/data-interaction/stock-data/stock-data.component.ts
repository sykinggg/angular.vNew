import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-stock-data',
    templateUrl: './stock-data.component.html',
    styleUrls: ['./stock-data.component.scss']
})
export class StockDataComponent implements OnInit {

    baseUrl: string;
    STOCK_BASIC: string;
    TRADE_CAL: string;
    HS_CONST: string;
    NAME_CHANGE: string;
    STOCK_COMPANY: string;
    NEW_SHARE: string;
    DAILY: string;
    ADJ_FACTOR: string;
    SUSPEND: string;
    MONEYFLOW_HSGT: string;
    HSGT_TOP10: string;
    GGT_TOP10: string;

    data: Array<any>;
    allData: Array<any>;

    // table
    allChecked: Boolean;
    indeterminate: Boolean;
    displayData: Array<any>;
    searchAddress: Array<any>;
    searchValue: string;
    sortValue: any;
    sortName: any;

    list_status_arr: Array<any>;
    listOfSelectedValue: string;
    selectedIndex: number;


    constructor(
        private http: HttpClient,
        private message: NzMessageService
    ) {
        this.baseUrl = 'http://127.0.0.1:666/tushare';
        this.STOCK_BASIC = '/storkBaseUrl';
        this.TRADE_CAL = '/tradeCalUrl';
        this.HS_CONST = '/hsConst';
        this.NAME_CHANGE = '/namechange';
        this.STOCK_COMPANY = '/stockCompany';
        this.NEW_SHARE = '/newShare';
        this.DAILY = '/daily';
        this.ADJ_FACTOR = '/adjFactor';
        this.SUSPEND = '/suspend';
        this.MONEYFLOW_HSGT = '/moneyflowHsgt';
        this.HSGT_TOP10 = '/hsgtTop10';
        this.GGT_TOP10 = '/ggt_top10';
        this.data = [];

        // table
        this.allChecked = false;
        this.indeterminate = false;
        this.displayData = [];
        this.searchAddress = [];
        this.searchValue = '';
        this.sortValue = null;
        this.sortName = null;
        this.allData = [];

        this.selectedIndex = 0;

        this.list_status_arr = [
            {
                name: '上市',
                value: 'L'
            },
            {
                name: '退市',
                value: 'D'
            },
            {
                name: '暂停上市',
                value: 'P'
            }
        ]
        this.listOfSelectedValue = 'L';
    }

    ngOnInit() {
        this.stockBasic();
    }

    stockBasic(type?) {
        let data = {
            api_name: 'stock_basic',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
            params: {
                list_status: 'L',
            },
            fields: 'ts_code,symbol,name,area,industry,market,list_date',
        }
        if (type) {
            data.params.list_status = type;
        }
        this.http.post(this.baseUrl + this.STOCK_BASIC, data).subscribe((res: any) => {
            if (+res.code === 0) {
                this.createMessage('success', '数据获取成功!');
                this.data = res.data.items;
                this.allData = res.data.items;
            } else {
                this.createMessage('error', res.msg || '数据获取失败!');
            }
        })
    }

    tradeCalData = [];
    tradeCal() {
        this.basePost(this.baseUrl + this.TRADE_CAL, null, 'tradeCalData');
    }

    hsConstData = [];
    hsConst() {
        this.basePost(this.baseUrl + this.HS_CONST, null, 'hsConstData');
    }

    namechangeData = [];
    namechange() {
        this.basePost(this.baseUrl + this.NAME_CHANGE, null, 'namechangeData');
    }

    stockCompanyData = [];
    stockCompany() {
        this.basePost(this.baseUrl + this.STOCK_COMPANY, null, 'stockCompanyData');
    }

    newShareData = [];
    newShare() {
        this.basePost(this.baseUrl + this.NEW_SHARE, null, 'newShareData');
    }

    dailyData = [];
    daily() {
        this.basePost(this.baseUrl + this.DAILY, null, 'dailyData');
    }

    adjFactorData = [];
    adjFactor() {
        this.basePost(this.baseUrl + this.ADJ_FACTOR, null, 'adjFactorData');
    }

    suspendData = [];
    suspend() {
        this.basePost(this.baseUrl + this.SUSPEND, null, 'suspendData');
    }

    moneyflowHsgtData = [];
    moneyflowHsgt() {
        this.basePost(this.baseUrl + this.MONEYFLOW_HSGT, null, 'moneyflowHsgtData');
    }

    hsgtTop10Data = [];
    hsgtTop10() {
        this.basePost(this.baseUrl + this.HSGT_TOP10, null, 'hsgtTop10Data');
    }

    ggtTop10Data = [];
    ggtTop10() {
        this.basePost(this.baseUrl + this.GGT_TOP10, null, 'ggtTop10Data');
    }

    basePost(url, params, typeData) {
        this.http.post(url, params).subscribe((res: any) => {
            if (+res.code === 0) {
                this.createMessage('success', '数据获取成功!');
                this[typeData] = res.data.items;
            } else {
                this.createMessage('error', res.msg || '数据获取失败!');
            }
        })
    }

    createMessage(type: string, msg: string) {
        this.message.create(type, msg);
    }

    // table

    currentPageDataChange($event: Array<any>): void {
        this.displayData = $event;
        this.refreshStatus();
    }

    refreshStatus(): void {
        const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }

    checkAll(value: boolean): void {
        this.displayData.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }

    search(): void {
        const filterFunc = (item) => {
            return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
                (item[2].indexOf(this.searchValue) !== -1);
        };
        this.data = this.allData.filter(item => filterFunc(item));
        if (this.data.length) {
            this.createMessage('success', '查询成功!');
        } else {
            this.data = this.allData;
            this.createMessage('error', '查询失败!');
        }
        // this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    }

}
