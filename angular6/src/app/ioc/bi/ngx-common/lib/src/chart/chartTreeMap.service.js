"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var render_1 = require("./render");
var ChartTreeMapService = /** @class */ (function () {
    function ChartTreeMapService(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
    ChartTreeMapService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return null;
        }
        var height = scope ? scope.myheight - 20 : null;
        var render = new render_1.Render(containerDom, option);
        render.addClick(chartConfig, relations, this.activatedRoute);
        return render.chart(height, persist);
    };
    ;
    ChartTreeMapService.prototype.parseOption = function (data) {
        var option = {
            tooltip: {
                formatter: '{b} : {c}'
            },
            series: [{
                    type: 'treemap',
                    visibleMin: 1,
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTopLeft',
                            formatter: function (a) {
                                return a.name + "\n\nvalue : " + a.value;
                            },
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    }
                }]
        };
        var config = data.chartConfig;
        var name = config.values[0].name ? config.values[0].name : "Main";
        option.series[0].name = name;
        var leafDepth = config.values[0].leafDepth ? config.values[0].leafDepth : 1;
        option.series[0].leafDepth = leafDepth;
        var style = config.values[0].style ? config.values[0].style : "random";
        if (style != "random" && style != "multi")
            option.color = [style];
        var depth = data.chartConfig.keys.length;
        var keys = data.keys;
        var values = data.data;
        for (var i in keys)
            keys[i].reverse();
        var datas = this.recursion(depth, depth, "", keys, values, style);
        if (style != "random" && style != "multi") {
            option.series[0].data = [
                {
                    value: 1000,
                    children: datas
                }
            ];
        }
        else {
            option.series[0].data = datas;
        }
        var levels = [];
        for (var i_1 = depth; i_1 > 0; i_1--) {
            levels.push({
                colorSaturation: [0.2, 0.6],
                itemStyle: {
                    normal: {
                        borderColorSaturation: 0.7,
                        gapWidth: i_1
                    }
                }
            });
        }
        option.series[0].levels = levels;
        return option;
    };
    ;
    /**
     * 递归
     */
    ChartTreeMapService.prototype.recursion = function (depth, totalDepth, prefix, keys, values, style) {
        var self = this;
        var map = this.getMap(depth, totalDepth, prefix, keys, values);
        var data = [];
        if (depth == totalDepth) {
            for (var k in map) {
                var obj = {
                    name: map[k].arr[depth - 1],
                    value: map[k].val,
                    children: self.recursion(depth - 1, totalDepth, map[k].key, keys, values)
                };
                if (style == "random")
                    obj.itemStyle = self.createRandomItemStyle();
                data.push(obj);
            }
        }
        else if (depth > 1) {
            for (var k in map) {
                data.push({
                    name: map[k].arr[depth - 1],
                    value: map[k].val,
                    children: self.recursion(depth - 1, totalDepth, map[k].key, keys, values)
                });
            }
        }
        else if (depth == 1) {
            for (var k in map) {
                data.push({
                    name: map[k].arr[depth - 1],
                    value: map[k].val
                });
            }
        }
        return data;
    };
    ChartTreeMapService.prototype.getMap = function (depth, totalDepth, prefix, keys, values) {
        var map = {};
        for (var i in keys) {
            var key = keys[i][depth - 1];
            if (totalDepth > depth) {
                var prefixs = "";
                for (var j = totalDepth; j > depth; j--) {
                    if (j == totalDepth)
                        prefixs = keys[i][j - 1];
                    else
                        prefixs = prefixs + "-" + keys[i][j - 1];
                }
                if (prefix != prefixs)
                    continue;
                key = prefix + "-" + key;
            }
            var val = isNaN(values[0][i]) ? 0 : parseFloat(values[0][i]);
            if (map[key] == undefined) {
                map[key] = { key: key, val: val, arr: keys[i] };
            }
            else {
                map[key] = { key: key, val: map[key].val + val, arr: keys[i] };
            }
        }
        return map;
    };
    ChartTreeMapService.prototype.createRandomItemStyle = function () {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')'
            }
        };
    };
    ChartTreeMapService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ChartTreeMapService);
    return ChartTreeMapService;
}());
exports.ChartTreeMapService = ChartTreeMapService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartTreeMap.service.js.map
