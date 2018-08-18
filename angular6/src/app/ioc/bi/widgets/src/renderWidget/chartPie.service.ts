import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Render } from './render';

import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
// import { CBoardEChartRender } from './render/eChartRender';
// import { updateEchartOptions } from './common/updateechartOptions';

@Injectable()

export class ChartPieService {
    constructor(
        private router: Router,
        private updateEchartOptions: UpdateEchartOptionsService
    ) {
    }

    public render(containerDom, option, scope, persist, drill, relations, chartConfig) {
        let render: any = new Render(containerDom, option, false);

        render.addClick(chartConfig, relations, this.router);

        return render.chart(null, persist);
    };

    public parseOption(data) {
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

        var series = new Array();
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var string_value = _.map(casted_values, function (value) {
            return value.join('-');
        });
        var b = 100 / (casted_values.length * 9 + 1);
        var titles = [];
        for (var i = 0; i < aggregate_data.length; i++) {
            var joined_values = casted_values[i].join('-');
            var realType = _.clone(newValuesConfig[joined_values]).type;
            var s: any = {
                name: string_value[i],
                type: 'pie',
                realType: realType,
                center: [5 * b + i * 9 * b + '%', '50%'],
                data: [],
                //roseType: 'angle'
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            //position:'inside',
                            formatter: '{b}: {d}%'
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    labelLine: {show: true}
                }
            };
            if (realType == 'coxcomb') {
                s.roseType = 'angle';
            }
            titles.push({
                textAlign: 'center', textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }, text: string_value[i], left: 5 * b + i * 9 * b + '%', top: '90%'
            });
            for (var j = 0; j < aggregate_data[i].length; j++) {
                s.data.push({
                    name: string_keys[j],
                    value: _.isUndefined(aggregate_data[i][j]) ? 0 : aggregate_data[i][j]
                });
            }
            series.push(s);
        }
        var echartOption = {
            title: titles,
            legend: {
                orient: 'vertical',
                left: 'left',
                data: string_keys
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: false,
            series: series
        };

        this.updateEchartOptions.updateEchartOptions(chartConfig.option, echartOption);

        return echartOption;
    };
}