import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../layout/http.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-houses',
    templateUrl: './houses.component.html',
    styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

    constructor(
        private http: HttpService,
        private message: NzMessageService
    ) { }

    lianjiaAddressObj: any;

    baseLinjia = [
        {
            name: '二手房',
            value: 'ershoufang'
        },
        {
            name: '租房',
            value: 'zufang'
        },
        {
            name: '小区',
            value: 'xiaoqu'
        }
    ]

    keAddressObj: any

    baseKe = [
        {
            name: '二手房',
            value: 'ershoufang'
        },
        {
            name: '租房',
            value: 'zufang'
        },
        {
            name: '新房',
            value: '楼盘'
        },
        {
            name: '小区',
            value: 'xiaoqu'
        }
    ]

    ngOnInit() {
        // 默认获取链家数据
        // this.grawlDataLianjiaCity();
        // this.lianjiaAddressObj = {
        //     data: this.baseLinjia,
        //     flag: this.baseLinjia[0]
        // }
        // 默认获取安居客数据
        // this.grawlDataAnjukeCity();
        // 默认初始化贝壳数据
        this.grawlDataKeCity();
        this.keAddressObj = {
            data: this.baseKe,
            flag: this.baseKe[0]
        }
    }

    /**
     * 链家
     */

    // 获取链家城市
    private grawlDataLianjiaCityData: any;
    private grawlDataLianjiaCity() {
        this.http.get({
            api: 'houses/grawlDataLianjiaCity'
        }).subscribe((res: any) => {
            this.grawlDataLianjiaCityData = res;
            // console.log(res);
        })
    }
    // 链家获取选择城市
    getGrawlDataLianjiaCityAllData: any;
    private getGrawlDataLianjiaCityData(data) {
        this.getGrawlDataLianjiaCityAllData = data;
    }

    // 进行数据爬取并写入数据库
    private setGrawlDataLianjiaCityURLData() {
        const data = this.getGrawlDataLianjiaCityAllData[this.getGrawlDataLianjiaCityAllData.length - 1].flag;
        data.flag = this.lianjiaAddressObj.flag;
        if (data.href.indexOf('.fang.') + 1) {
            this.createBasicMessage('没有二手房信息暂无法爬取');
        } else {
            this.http.post({
                api: 'houses/grawlDataLianjiaCityURL',
                data
            }).subscribe((res: any) => {
                this.createBasicMessage(res);
            })
        }
    }

    // 获取写入到数据库中爬取的数据
    private getGrawlDataLianjiaCityURLDatas;
    private getGrawlDataLianjiaCityURLData() {
        const data = this.getGrawlDataLianjiaCityAllData[this.getGrawlDataLianjiaCityAllData.length - 1].flag;
        if (data.href.indexOf('.fang.') + 1) {
            console.log(data);
            this.createBasicMessage('没有二手房信息暂无法爬取');
        } else {
            this.http.post({
                api: 'houses/getGrawlDataLianjiaCityURLData',
                data
            }).subscribe((res: any) => {
                console.log(res);
                this.getGrawlDataLianjiaCityURLDatas = res;
            })
        }
    }

    /**
     * 安居客
     */

    // 获取安居客城市
    grawlDataAnjukeCity() {
        this.http.get({
            api: 'houses/grawlDataAnjukeCity'
        }).subscribe(res => {
            console.log(res);
        })
    }

    /**
     * 贝壳
     */

    // 获取贝壳城市
    grawlDataKeCityData: any;
    grawlDataKeCity() {
        this.http.get({
            api: 'houses/grawlDataKeCity'
        }).subscribe(res => {
            console.log(res);
            this.grawlDataKeCityData = res;
        })
    }

    // 组件进行地址选择
    getGrawlDataKeCityAllData: any;
    getGrawlDataKeCityData(event) {
        this.getGrawlDataKeCityAllData = event;
    }

    // 进行数据爬取并写入数据库
    setGrawlDataKeCityURLData() {
        const data = this.getGrawlDataKeCityAllData[this.getGrawlDataKeCityAllData.length - 1].flag;
        data.flag = this.keAddressObj.flag;
        this.http.post({
            data,
            api: 'houses/grawlDataKeCityURL'
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    /**
     * 全局
     */

    // 全局提示信息
    createBasicMessage(msg): void {
        this.message.info(msg);
    }

}
