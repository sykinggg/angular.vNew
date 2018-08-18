"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var updateechartOptions_service_1 = require("./common/updateechartOptions.service");
var render_1 = require("./render");
var _ = require("lodash");
var eCharts = require('echarts');
var ChartRadarService = /** @class */ (function () {
    function ChartRadarService(activatedRoute, updateEchartOptions) {
        this.activatedRoute = activatedRoute;
        this.updateEchartOptions = updateEchartOptions;
    }
    ChartRadarService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new render_1.Render(containerDom, option, null, eCharts);
        render.addClick(chartConfig, relations, this.activatedRoute);
        return render.chart(null, persist);
    };
    ;
    ChartRadarService.prototype.parseOption = function (_data) {
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
                var d = { value: [], name: string_keys[i] };
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
                indicator.push({ name: casted_values[j], max: max * 1.05 });
            }
        }
        else {
            for (var i = 0; i < string_values.length; i++) {
                var d = { value: [], name: string_values[i] };
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
                indicator.push({ name: string_keys[j], max: max * 1.05 });
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
                            areaStyle: { color: 'rgba(0,250,0,0.3)' }
                        }
                    },
                    data: data
                }]
        };
        this.updateEchartOptions.updateEchartOptions(chartConfig.option, echartOption);
        return echartOption;
    };
    ;
    ChartRadarService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            updateechartOptions_service_1.UpdateEchartOptionsService])
    ], ChartRadarService);
    return ChartRadarService;
}());
exports.ChartRadarService = ChartRadarService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartRadar.service.js.map
