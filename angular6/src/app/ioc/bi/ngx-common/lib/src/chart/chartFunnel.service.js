"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var updateechartOptions_service_1 = require("./common/updateechartOptions.service");
var render_1 = require("./render");
var _ = require("lodash");
var eCharts = require('echarts');
var ChartFunnelService = /** @class */ (function () {
    function ChartFunnelService(activeRoute, updateEchartOptions) {
        this.activeRoute = activeRoute;
        this.updateEchartOptions = updateEchartOptions;
    }
    ChartFunnelService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new render_1.Render(containerDom, option, null, eCharts);
        render.addClick(chartConfig, relations, this.activeRoute);
        return render.chart(null, persist);
    };
    ;
    ChartFunnelService.prototype.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var string_values = _.map(casted_values, function (value) {
            return value.join('-');
        });
        var series = [];
        var b = 100 / (string_keys.length * 9 + 1);
        var titles = [];
        for (var i = 0; i < string_keys.length; i++) {
            var s = {
                name: string_keys[i],
                type: 'funnel',
                left: b + i * b * 9 + '%',
                width: b * 8 + '%',
                maxSize: '100%',
                minSize: '10%',
                label: {
                    normal: {
                        formatter: function (params) {
                            return params.value + "\n" + params.data.percent + "%";
                        },
                        show: true,
                        position: 'inside'
                    }
                },
                data: []
            };
            titles.push({
                textAlign: 'center', textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }, text: string_keys[i], left: 5 * b + i * 9 * b + '%', top: '90%'
            });
            var m = parseFloat(_.max(aggregate_data));
            for (var d = 0; d < string_values.length; d++) {
                s.data.push({
                    name: string_values[d],
                    value: aggregate_data[d][i],
                    percent: (aggregate_data[d][i] / m * 100).toFixed(2)
                });
            }
            series.push(s);
        }
        var echartOption = {
            title: titles,
            legend: {
                data: string_values
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + " <br/>" + params.name + " : " + params.value + "<br>" + params.data.percent + "%";
                }
            },
            toolbox: false,
            series: series
        };
        this.updateEchartOptions.updateEchartOptions(chartConfig.option, echartOption);
        return echartOption;
    };
    ;
    ChartFunnelService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            updateechartOptions_service_1.UpdateEchartOptionsService])
    ], ChartFunnelService);
    return ChartFunnelService;
}());
exports.ChartFunnelService = ChartFunnelService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartFunnel.service.js.map
