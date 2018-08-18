"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var render_1 = require("./render");
require('echarts-wordcloud');
var ChartWordCloudService = /** @class */ (function () {
    function ChartWordCloudService(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
    ChartWordCloudService.prototype.render = function (containerDom, option, scope, persist, drill, relations, chartConfig) {
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
    ChartWordCloudService.prototype.parseOption = function (data) {
        var names = data.keys;
        var values = data.data;
        var datas = [];
        for (var i in names) {
            datas.push({
                name: names[i].join("-"),
                value: values[0][i]
            });
        }
        var option = {
            tooltip: {
                formatter: "{b} : {c}"
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
            series: [{
                    type: 'wordCloud',
                    gridSize: 5,
                    sizeRange: [12, 50],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    shape: 'circle',
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: datas
                }]
        };
        return option;
    };
    ;
    ChartWordCloudService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ChartWordCloudService);
    return ChartWordCloudService;
}());
exports.ChartWordCloudService = ChartWordCloudService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartWordCloud.service.js.map
