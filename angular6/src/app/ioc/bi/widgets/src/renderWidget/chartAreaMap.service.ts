import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Render } from './render';
import { ActivatedRoute } from '@angular/router';
var echarts = require('echarts');

@Injectable()

export class ChartAreaMapService {
    constructor(private activatedRoute: ActivatedRoute) {
    }

    public render(containerDom, option, scope, persist, drill, relations, chartConfig) {
        let render = new Render(containerDom, option);

        render.addClick(chartConfig, relations, this.activatedRoute);

        return render.chart(null, persist);
    };

    public parseOption(data) {
        let self = this;
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var tunningOpt = chartConfig.option;

        var code = 'china';
        if (chartConfig.city && chartConfig.city.code) {
            code = chartConfig.city.code;
        } else if (chartConfig.province && chartConfig.province.code) {
            code = chartConfig.province.code;
        }
        var url, zoomLevel;
        if (code == 'china') {
            url = 'assets/plugins/FineMap/mapdata/china.json'
            zoomLevel = 1;
        } else if (code.length > 2) {
            zoomLevel = 3;
            url = 'assets/plugins/FineMap/mapdata/geometryCouties/' + code + '.json';
        } else {
            zoomLevel = 2;
            url = 'assets/plugins/FineMap/mapdata/geometryProvince/' + code + '.json';
        }
        var mapOption = null;
        var groups = _.map(casted_values, function (val) {
            return val.join("-")
        });
        var series: any = [];
        for (var i = 0; i < groups.length; i++) {
            let data = [];
            for (var j = 0; j < aggregate_data[i].length; j++) {
                var rawName = casted_keys[j][chartConfig.keys.length - 1];
                var name = !tunningOpt.hasSuffix ? self.processLocName(rawName, zoomLevel) : rawName;
                let e = {name: name, value: aggregate_data[i][j] ? aggregate_data[i][j] : 0};
                data.push(e);
            }
            let e = {
                name: groups[i],
                type: 'map',
                map: code,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#EFF0F0',
                        borderColor: '#B5B5B5',
                        borderWidth: 1
                    }
                },
                data: data
            };
            series.push(e);
        }
        var totals = [];
        for (var i = 0; i < casted_values.length; i++) {
            var total = 0;
            for(var j=0;j<aggregate_data[i].length;j++){
                total += parseFloat(!isNaN(aggregate_data[i][j]) ? aggregate_data[i][j]:0);
            }
            totals.push(total);
        }
        totals.sort(function (a, b) {
            return a - b;
        });
        var max = totals[totals.length - 1];
        $.ajax({
            type: "get",
            url: url,
            async: false,
            success: function (cityJson) {
                echarts.registerMap(code, cityJson);
                let nameMap = {};
                if(series&&series[0]&&series[0].data&&series[0].data.length) {
                    _.map(cityJson.features, (itemValue: any, key: number) => {
                        nameMap[itemValue.properties.name] = series[0].data[key].name;
                    })
                }
                mapOption = {
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: groups
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}'
                    },
                    visualMap: {
                        min: 0,
                        max: max,
                        left: 'right',
                        top: 'bottom',
                        text: ['High', 'Low'],
                        inRange: {
                            color: ['#e0ffff', '#006edd']
                        },
                        calculable: true
                    },
                    series: series,
                    nameMap: nameMap
                };
            }
        });
        return mapOption;
    };

    public processLocName(rawName, zoomLevel) {
        var result = rawName;
        var suffixList = ['省', '市', '县', '区'];
        var needProcess = true;
        _.each(suffixList, function (suffix) {
            if (rawName.indexOf(suffix) >= 0) {
                needProcess = false;
            }
        });
        if (!needProcess) {
            return rawName;
        }
        var trimedName = rawName.replace(/省|市|县|区|特别行政/gi, '');
        var zxs = ['北京', '上海', '天津', '重庆'];
        var suffix;
        switch (zoomLevel) {
            case 1:
                if (_.includes(zxs, trimedName )) {
                    suffix = '市';
                } else {
                    suffix = '省';
                }
                break;
            case 2:
                if (_.includes(zxs, trimedName )) {
                    suffix = '区';
                } else {
                    suffix = '市';
                }
                break;
        }
        return result + suffix;
    }
}