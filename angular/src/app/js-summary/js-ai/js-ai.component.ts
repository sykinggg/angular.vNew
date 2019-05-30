import { Component, OnInit } from '@angular/core';
import { AiIndexService } from '../jsAiServer/aiIndex/ai-index.service';
import { HttpService } from '../../layout/http.service';

@Component({
    selector: 'app-js-ai',
    templateUrl: './js-ai.component.html',
    styleUrls: ['./js-ai.component.scss']
})
export class JsAiComponent implements OnInit {

    public eCharrtOption: any;

    constructor(
        public aiIndexService: AiIndexService,
        public http: HttpService,
    ) {

    }

    ngOnInit() {
    }

    public testBtn() {
        console.log('this.aiIndexService.training();');
        this.aiIndexService.training();
        // this.doThing(10);
    }

    public doThing(n: number) {
        let a, i;
        a = setInterval(() => {
            if (n >= i) {
                this.aiIndexService.training();
                i++
            } else {
                clearInterval(a);
            }
        })
    }

    public eChartOption = {
        title: {
            text: '人工智障'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['成功率']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                        formatter: '{c}%'
                    }
                },
                name: '成功率',
                type: 'line',
                stack: '百分比',
                areaStyle: {},
                data: []
            },
        ]
    }

    public myformatter(date) {
        let strDate = date.getFullYear() + "-";
        strDate += date.getMonth() + 1 + "-";
        strDate += date.getDate() + "-";
        strDate += date.getHours() + ":";
        strDate += date.getMinutes() + ":";
        strDate += date.getSeconds();
        return strDate;
    }

    public getData() {
        this.http.post({
            api: 'ai/dataBaseObtain',
        }).subscribe((res: any) => {
            if (res && Array.isArray(res)) {
                res.forEach((item: any) => {
                    const now: any = new Date(item.dateTime);
                    this.eChartOption.xAxis[0].data.push(this.myformatter(now));
                    let num = item.correct / (item.correct + item.error) * 100;
                    // tslint:disable-next-line:no-bitwise
                    num = num | 0;
                    this.eChartOption.series[0].data.push(num);
                })
            }
            this.eCharrtOption = {
                fType: 'eChart',
                type: 'line',
                data: {
                    init: {
                        width: 12,
                        height: 300
                    },
                    setOption: this.eChartOption
                }
            }
            console.log(this.eChartOption);
        })
    }

    public deleteData() {
        this.http.post({
            api: 'ai/dataBaseDelete',
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

}
