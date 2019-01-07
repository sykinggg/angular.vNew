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
    MARGIN: string;
    MARGIN_DETAIL: string;
    TOP10_HOLDERS: string;
    TOP10_FLOATHOLDERS: string;
    INDEX_BASIC: string;
    INDEX_DAILY: string;


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
        this.MARGIN = '/margin';
        this.MARGIN_DETAIL = '/margin_detail';
        this.TOP10_HOLDERS = '/top10_holders';
        this.TOP10_FLOATHOLDERS = '/top10_floatholders';
        this.INDEX_BASIC = '/index_basic';
        this.INDEX_DAILY = '/index_daily';
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

    // 交易日历
    tradeCalData = [];
    tradeCal() {
        this.basePost(this.baseUrl + this.TRADE_CAL, null, 'tradeCalData', '交易日历');
    }

    // 沪深股通成份股
    hsConstData = [];
    hsConst() {
        this.basePost(this.baseUrl + this.HS_CONST, null, 'hsConstData', '沪深股通成份股');
    }

    // 股票曾用名
    namechangeData = [];
    namechange() {
        this.basePost(this.baseUrl + this.NAME_CHANGE, null, 'namechangeData', '股票曾用名');
    }

    // 上市公司基本信息
    stockCompanyData = [];
    stockCompany() {
        this.basePost(this.baseUrl + this.STOCK_COMPANY, null, 'stockCompanyData', '上市公司基本信息');
    }

    // IPO新股列表
    newShareData = [];
    newShare() {
        this.basePost(this.baseUrl + this.NEW_SHARE, null, 'newShareData', 'IPO新股列表');
    }

    // 日线行情
    dailyData = [];
    daily() {
        this.basePost(this.baseUrl + this.DAILY, null, 'dailyData', '日线行情');
    }

    // 复权因子
    adjFactorData = [];
    adjFactor() {
        this.basePost(this.baseUrl + this.ADJ_FACTOR, null, 'adjFactorData', '复权因子');
    }

    // 停复牌信息
    suspendData = [];
    suspend() {
        this.basePost(this.baseUrl + this.SUSPEND, null, 'suspendData', '停复牌信息');
    }

    // 沪深港通资金流向
    moneyflowHsgtData = [];
    moneyflowHsgt() {
        this.basePost(this.baseUrl + this.MONEYFLOW_HSGT, null, 'moneyflowHsgtData', '沪深港通资金流向');
    }

    // 沪深股通十大成交股
    hsgtTop10Data = [];
    hsgtTop10() {
        this.basePost(this.baseUrl + this.HSGT_TOP10, null, 'hsgtTop10Data', '沪深股通十大成交股');
    }

    // 港股通十大成交股
    ggtTop10Data = [];
    ggtTop10() {
        this.basePost(this.baseUrl + this.GGT_TOP10, null, 'ggtTop10Data', '港股通十大成交股');
    }

    // 融资融券交易汇总
    marginData = [];
    margin() {
        this.basePost(this.baseUrl + this.MARGIN, null, 'marginData', '融资融券交易汇总');
    }

    // 融资融券交易明细
    marginDetailData = [];
    marginDetail() {
        this.basePost(this.baseUrl + this.MARGIN_DETAIL, null, 'marginDetailData', '融资融券交易明细');
    }

    // 前十大股东
    top10HoldersData = [];
    top10Holders() {
        this.basePost(this.baseUrl + this.TOP10_HOLDERS, null, 'top10HoldersData', '前十大股东');
    }

    // 前十大流通股东
    top10FloatholdersData = [];
    top10Floatholders() {
        this.basePost(this.baseUrl + this.TOP10_FLOATHOLDERS, null, 'top10FloatholdersData', '前十大流通股东');
    }

    // 指数基本信息
    indexBasicData = [];
    indexBasic() {
        this.basePost(this.baseUrl + this.INDEX_BASIC, null, 'indexBasicData', '指数基本信息');
    }


    indexDailyData = [];
    indexDaily() {
        this.basePost(this.baseUrl + this.INDEX_DAILY, null, 'indexDailyData');
    }

    basePost(url, params, typeData, str?) {
        this.http.post(url, params).subscribe((res: any) => {
            if (+res.code === 0) {
                this.createMessage('success', str + '数据获取成功!');
                this[typeData] = res.data.items;
            } else {
                this.createMessage('error', str + res.msg || '数据获取失败!');
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
