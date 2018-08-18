"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var _ = require("lodash");
var router_1 = require("@angular/router");
var render_1 = require("./render");
var updateechartOptions_service_1 = require("./common/updateechartOptions.service");
// import { CBoardEChartRender } from './render/eChartRender';
// import { updateEchartOptions } from './common/updateechartOptions';
var ChartPieService = /** @class */ (function () {
    function ChartPieService(router, updateEchartOptions) {
        this.router = router;
        this.updateEchartOptions = updateEchartOptions;
    }
    ChartPieService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new render_1.Render(containerDom, option, false);
        render.addClick(chartConfig, relations, this.router);
        return render.chart(null, persist);
    };
    ;
    ChartPieService.prototype.parseOption = function (data) {
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
            var s = {
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
                    labelLine: { show: true }
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
    ;
    ChartPieService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            updateechartOptions_service_1.UpdateEchartOptionsService])
    ], ChartPieService);
    return ChartPieService;
}());
exports.ChartPieService = ChartPieService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartPie.service.js.map
