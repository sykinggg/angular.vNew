import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
import { Render } from './render';

import * as _ from 'lodash';
var eCharts = require('echarts');

@Injectable()

export class ChartRadarService {
    constructor(
        private activatedRoute: ActivatedRoute,
        private updateEchartOptions: UpdateEchartOptionsService
    ) {
    }

    public render(containerDom, option, scope, persist, drill, relations, chartConfig) {
        let render = new Render(containerDom, option, null, eCharts);

        render.addClick(chartConfig, relations, this.activatedRoute);

        return render.chart(null, persist);
    };

    public parseOption(_data) {
        var chartConfig = _data.chartConfig;
        var casted_keys = _data.keys;
        var casted_values = _data.series;
        var aggregate_data = _data.data;

        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var string_values = _.map(casted_values, function (value) {
            return value.join('-');
        });
        var data = [];
        var max;
        var indicator = [];
        if (chartConfig.drawBy === 'row') {
            for (var i = 0; i < string_keys.length; i++) {
                var d = {value: [], name: string_keys[i]};
                for (var j = 0; j < casted_values.length; j++) {
                    d.value[j] = aggregate_data[j][i];
                    var n = Number(aggregate_data[j][i]);
                    if (_.isUndefined(max) || n > max) {
                        max = n;
                    }
                }
                data.push(d);
            }
            for (var j = 0; j < casted_values.length; j++) {
                indicator.push({name: casted_values[j], max: max * 1.05});
            }
        } else {
            for (var i = 0; i < string_values.length; i++) {
                var d = {value: [], name: string_values[i]};
                for (var j = 0; j < string_keys.length; j++) {
                    d.value[j] = aggregate_data[i][j];
                    var n = Number(aggregate_data[i][j]);
                    if (_.isUndefined(max) || n > max) {
                        max = n;
                    }
                }
                data.push(d);
            }
            for (var j = 0; j < string_keys.length; j++) {
                indicator.push({name: string_keys[j], max: max * 1.05});
            }
        }


        var echartOption = {
            tooltip: {
                trigger: 'item'
            },
            toolbox: false,
            legend: {
                orient: 'vertical',
                left: 'left',
                data: chartConfig.drawBy === 'row' ? string_keys : string_values
            },
            radar: {
                indicator: indicator
            },
            series: [{
                name: 'radar',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        areaStyle: {color: 'rgba(0,250,0,0.3)'}
                    }
                },
                data: data
            }]
        };

        this.updateEchartOptions.updateEchartOptions(chartConfig.option, echartOption);

        return echartOption;
    };
}