"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var render_1 = require("./render");
var numbro = require('numbro');
var ChartGaugeService = /** @class */ (function () {
    function ChartGaugeService() {
    }
    ChartGaugeService.prototype.render = function (containerDom, option, scope, persist) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return null;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        return new render_1.Render(containerDom, option).chart(height, persist);
    };
    ;
    ChartGaugeService.prototype.parseOption = function (data) {
        var option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}"
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: true, readOnly: true },
                    //magicType : {show: true, type: ['line', 'bar']},
                    restore: { show: false },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    type: 'gauge',
                    min: 0,
                    max: 100,
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [0.2, '#228b22'],
                                [0.8, '#48b'],
                                [1, '#ff4500']
                            ],
                            width: 8
                        }
                    },
                    axisTick: {
                        splitNumber: 10,
                        length: 12,
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'auto'
                        }
                    },
                    splitLine: {
                        show: true,
                        length: 20,
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, '-40%'],
                        textStyle: {
                            fontWeight: 'bolder'
                        }
                    },
                    detail: {
                        formatter: '{value}',
                        textStyle: {
                            color: 'auto',
                            fontWeight: 'bolder',
                            fontSize: 20
                        }
                    },
                    data: []
                }
            ]
        };
        var config = data.chartConfig;
        var aggregate_data = data.data;
        var name = config.values[0].name ? config.values[0].name : "";
        var minValue = config.values[0].minValue ? config.values[0].minValue : 0;
        var maxValue = config.values[0].maxValue ? config.values[0].maxValue : 100;
        if (isNaN(minValue) || isNaN(maxValue) || parseFloat(minValue) >= parseFloat(maxValue)) {
            minValue = 0;
            maxValue = 100;
        }
        option.series[0].min = minValue;
        option.series[0].max = maxValue;
        var colors = [];
        for (var i in config.styles) {
            var proportion = config.styles[i].proportion;
            var color = config.styles[i].color;
            if (proportion != undefined && proportion != "")
                colors.push([proportion, color]);
        }
        if (colors.length > 0) {
            option.series[0].axisLine.lineStyle.color = colors;
        }
        var value = (aggregate_data.length > 0 && aggregate_data[0].length > 0) ? aggregate_data[0][0] : 'N/A';
        if (config.values[0].format) {
            value = numbro(value).format(config.values[0].format);
        }
        var index = value.lastIndexOf("%");
        if (index != -1) {
            value = value.substring(0, index);
            option.tooltip.formatter = "{a} <br/>{b} : {c}%";
            option.series[0].detail.formatter = "{value}%";
        }
        option.series[0].data = [{ name: name, value: value }];
        return option;
    };
    ;
    ChartGaugeService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ChartGaugeService);
    return ChartGaugeService;
}());
exports.ChartGaugeService = ChartGaugeService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartGauge.service.js.map
