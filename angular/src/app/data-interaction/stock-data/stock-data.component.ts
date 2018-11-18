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
    aaa: string;
    listOfSelectedValue: Array<any>;

    constructor(
        private http: HttpClient,
        private message: NzMessageService
    ) {
        this.baseUrl = 'http://127.0.0.1:666/tushare';
        this.STOCK_BASIC = '/storkBaseUrl';
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

        this.list_status_arr = [
            {
                name: '退市',
                value: 'L'
            },
            {
                name: '上市',
                value: 'D'
            },
            {
                name: '暂停上市',
                value: 'P'
            }
        ]
        this.aaa = 'L';
        this.listOfSelectedValue = ['L'];
    }

    ngOnInit() {
        this.tushare();
    }

    tushareJoin() {
        const str = this.listOfSelectedValue.join();
        this.tushare(str);
    }

    tushare(type? ) {
        let data = {
            api_name: 'stock_basic',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
            params: {
                list_status: 'L,D,P',
            },
            fields: 'ts_code,symbol,name,area,industry,market,list_date',
        }
        if(type) {
            data.params.list_status = type;
        }
        this.http.post(this.baseUrl + this.STOCK_BASIC, data).subscribe((res: any) => {
            // if (+res.code === 0) {
            //     this.createMessage('success', '数据获取成功!');
            //     this.data = res.data.items;
            // } else {
            //     this.createMessage('error', res.msg || '数据获取失败!');
            // }
            if (res[0]) {
                this.createMessage('success', '数据获取成功!');
                this.data = res[0].data[0].items;
                this.allData = res[0].data[0].items;
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
