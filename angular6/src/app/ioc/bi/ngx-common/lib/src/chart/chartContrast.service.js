"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var _ = require("lodash");
var router_1 = require("@angular/router");
var updateechartOptions_service_1 = require("./common/updateechartOptions.service");
var render_1 = require("./render");
var ChartContrastService = /** @class */ (function () {
    function ChartContrastService(activatedRoute, updateEchartOptionsService) {
        this.activatedRoute = activatedRoute;
        this.updateEchartOptionsService = updateEchartOptionsService;
    }
    ChartContrastService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new render_1.Render(containerDom, option);
        render.addClick(chartConfig, relations, this.activatedRoute);
        return render.chart(null, persist);
    };
    ;
    ChartContrastService.prototype.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;
        var tunningOpt = chartConfig.option;
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var max = aggregate_data[0][0];
        _.each(aggregate_data, function (arr) {
            _.each(arr, function (e) {
                if (parseFloat(e) > parseFloat(max)) {
                    max = e;
                }
            });
        });
        var Axis = [
            {
                type: 'value',
                min: -max,
                max: max
            }
        ];
        var valueAxis = [
            {
                type: 'category',
                axisTick: { show: false },
                data: string_keys
            }
        ];
        var echartOptionData = [casted_values[0] || '', casted_values[1] || 0];
        if (casted_values[0] && casted_values[1]) {
            echartOptionData = [casted_values[0][0] || casted_values[0] || '', casted_values[1][0] || casted_values[1] || 0];
        }
        var echartOption = {
            tooltip: {
                formatter: function (params) {
                    var name = params[0].name;
                    var s = name + "</br>";
                    for (var i = 0; i < params.length; i++) {
                        s += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>';
                        if (params[i].value instanceof Array) {
                            s += params[i].seriesName + " : " + params[i].value[1] + "% (" + params[i].value[2] + ")<br>";
                        }
                        else {
                            s += params[i].seriesName + " : " + params[i].value + "<br>";
                        }
                    }
                    return s;
                }
            },
            legend: {
                data: echartOptionData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: chartConfig.valueAxis == "horizontal" ? valueAxis : Axis,
            yAxis: chartConfig.valueAxis == "horizontal" ? Axis : valueAxis,
            series: [
                {
                    name: casted_values[0],
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#C23531'
                        }
                    },
                    data: _.map(aggregate_data[0], function (e) { return -e; })
                },
                {
                    name: casted_values[1],
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#3C8DBC'
                        }
                    },
                    data: aggregate_data[1]
                }
            ]
        };
        this.updateEchartOptionsService.updateEchartOptions(tunningOpt, echartOption);
        return echartOption;
    };
    ;
    ChartContrastService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            updateechartOptions_service_1.UpdateEchartOptionsService])
    ], ChartContrastService);
    return ChartContrastService;
}());
exports.ChartContrastService = ChartContrastService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartContrast.service.js.map
