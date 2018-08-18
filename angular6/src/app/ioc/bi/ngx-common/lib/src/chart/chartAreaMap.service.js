"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var _ = require("lodash");
var render_1 = require("./render");
var router_1 = require("@angular/router");
var echarts = require('echarts');
var ChartAreaMapService = /** @class */ (function () {
    function ChartAreaMapService(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
    ChartAreaMapService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new render_1.Render(containerDom, option);
        render.addClick(chartConfig, relations, this.activatedRoute);
        return render.chart(null, persist);
    };
    ;
    ChartAreaMapService.prototype.parseOption = function (data) {
        var self = this;
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var tunningOpt = chartConfig.option;
        var code = 'china';
        if (chartConfig.city && chartConfig.city.code) {
            code = chartConfig.city.code;
        }
        else if (chartConfig.province && chartConfig.province.code) {
            code = chartConfig.province.code;
        }
        var url, zoomLevel;
        if (code == 'china') {
            url = 'assets/plugins/FineMap/mapdata/china.json';
            zoomLevel = 1;
        }
        else if (code.length > 2) {
            zoomLevel = 3;
            url = 'assets/plugins/FineMap/mapdata/geometryCouties/' + code + '.json';
        }
        else {
            zoomLevel = 2;
            url = 'assets/plugins/FineMap/mapdata/geometryProvince/' + code + '.json';
        }
        var mapOption = null;
        var groups = _.map(casted_values, function (val) {
            return val.join("-");
        });
        var series = [];
        for (var i = 0; i < groups.length; i++) {
            var data_1 = [];
            for (var j = 0; j < aggregate_data[i].length; j++) {
                var rawName = casted_keys[j][chartConfig.keys.length - 1];
                var name = !tunningOpt.hasSuffix ? self.processLocName(rawName, zoomLevel) : rawName;
                var e_1 = { name: name, value: aggregate_data[i][j] ? aggregate_data[i][j] : 0 };
                data_1.push(e_1);
            }
            var e = {
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
                data: data_1
            };
            series.push(e);
        }
        var totals = [];
        for (var i = 0; i < casted_values.length; i++) {
            var total = 0;
            for (var j = 0; j < aggregate_data[i].length; j++) {
                total += parseFloat(!isNaN(aggregate_data[i][j]) ? aggregate_data[i][j] : 0);
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
                var nameMap = {};
                if (series && series[0] && series[0].data && series[0].data.length) {
                    _.map(cityJson.features, function (itemValue, key) {
                        nameMap[itemValue.properties.name] = series[0].data[key].name;
                    });
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
    ;
    ChartAreaMapService.prototype.processLocName = function (rawName, zoomLevel) {
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
                if (_.includes(zxs, trimedName)) {
                    suffix = '市';
                }
                else {
                    suffix = '省';
                }
                break;
            case 2:
                if (_.includes(zxs, trimedName)) {
                    suffix = '区';
                }
                else {
                    suffix = '市';
                }
                break;
        }
        return result + suffix;
    };
    ChartAreaMapService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ChartAreaMapService);
    return ChartAreaMapService;
}());
exports.ChartAreaMapService = ChartAreaMapService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartAreaMap.service.js.map
