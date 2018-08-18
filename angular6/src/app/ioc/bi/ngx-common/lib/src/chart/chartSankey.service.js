"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var chart_options_1 = require("./chart-options");
var render_1 = require("./render");
var _ = require("lodash");
var ChartSankeyService = /** @class */ (function () {
    function ChartSankeyService(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
    ChartSankeyService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        var render = new render_1.Render(containerDom, option);
        render.addClick(chartConfig, relations, this.activatedRoute);
        return render.chart(null, persist);
    };
    ;
    ChartSankeyService.prototype.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;
        var nodes = [];
        var string_keys = _.map(casted_keys, function (key) {
            var s = key.join('-');
            if (!_.find(nodes, function (e) { return e.name == s; })) {
                nodes.push({ name: s });
            }
            return s;
        });
        _.each(casted_values, function (values) {
            if (values.length > 1) {
                values.splice(-1, 1);
            }
            var s = values.join('-');
            if (!_.find(nodes, function (e) { return e.name == s; })) {
                nodes.push({ name: s });
            }
        });
        var links = [];
        for (var i = 0; i < aggregate_data.length; i++) {
            for (var j = 0; j < aggregate_data[i].length; j++) {
                if (!_.isUndefined(aggregate_data[i][j])) {
                    links.push({
                        source: string_keys[j],
                        target: casted_values[i].join('-'),
                        value: aggregate_data[i][j]
                    });
                }
            }
        }
        var echartOption = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            toolbox: false,
            series: [{
                    type: 'sankey',
                    layout: 'none',
                    data: nodes,
                    links: links,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#aaa'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.5
                        }
                    }
                }]
        };
        var tunningOpt = chartConfig.option;
        if (tunningOpt) {
            if (tunningOpt.legendShow === false) {
                echartOption.grid = tslib_1.__assign({}, chart_options_1.CHART_BASIC_OPTION.grid);
                echartOption.grid.top = '5%';
                echartOption.legend.show = false;
            }
        }
        return echartOption;
    };
    ChartSankeyService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ChartSankeyService);
    return ChartSankeyService;
}());
exports.ChartSankeyService = ChartSankeyService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartSankey.service.js.map
