"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var _ = require("lodash");
var rxjs_1 = require("rxjs");
var index_1 = require("app/pack/common/src/index");
var chartLine_service_1 = require("./chartLine.service");
var chartTable_service_1 = require("./chartTable.service");
var chartPie_service_1 = require("./chartPie.service");
var chartKpi_service_1 = require("./chartKpi.service");
var chartFunnel_service_1 = require("./chartFunnel.service");
var chartSankey_service_1 = require("./chartSankey.service");
var chartRadar_service_1 = require("./chartRadar.service");
var chartMap_service_1 = require("./chartMap.service");
var chartScatter_service_1 = require("./chartScatter.service");
var chartGauge_service_1 = require("./chartGauge.service");
var chartWordCloud_service_1 = require("./chartWordCloud.service");
var chartTreeMap_service_1 = require("./chartTreeMap.service");
var chartAreaMap_service_1 = require("./chartAreaMap.service");
var chartHeatMapCalendar_service_1 = require("./chartHeatMapCalendar.service");
var chartHeatMapTable_service_1 = require("./chartHeatMapTable.service");
var chartLiquidFill_service_1 = require("./chartLiquidFill.service");
var chartContrast_service_1 = require("./chartContrast.service");
var chartChinaMap_service_1 = require("./chartChinaMap.service");
var chartChinaMapBmap_service_1 = require("./chartChinaMapBmap.service");
var chartRelation_service_1 = require("./chartRelation.service");
var ChartService = /** @class */ (function () {
    function ChartService(chartdataService, chartLineService, chartTableService, chartPieService, chartKpiService, chartFunnelService, chartSankeyService, chartRadarService, chartMapService, chartScatterService, chartGaugeService, chartWordCloudService, chartTreeMapService, chartAreaMapService, chartHeatMapCalendarService, chartHeatMapTableService, chartLiquidFillService, chartContrastService, chartChinaMapService, chartChinaMapBMapService, chartRelationService) {
        this.chartdataService = chartdataService;
        this.chartLineService = chartLineService;
        this.chartTableService = chartTableService;
        this.chartPieService = chartPieService;
        this.chartKpiService = chartKpiService;
        this.chartFunnelService = chartFunnelService;
        this.chartSankeyService = chartSankeyService;
        this.chartRadarService = chartRadarService;
        this.chartMapService = chartMapService;
        this.chartScatterService = chartScatterService;
        this.chartGaugeService = chartGaugeService;
        this.chartWordCloudService = chartWordCloudService;
        this.chartTreeMapService = chartTreeMapService;
        this.chartAreaMapService = chartAreaMapService;
        this.chartHeatMapCalendarService = chartHeatMapCalendarService;
        this.chartHeatMapTableService = chartHeatMapTableService;
        this.chartLiquidFillService = chartLiquidFillService;
        this.chartContrastService = chartContrastService;
        this.chartChinaMapService = chartChinaMapService;
        this.chartChinaMapBMapService = chartChinaMapBMapService;
        this.chartRelationService = chartRelationService;
    }
    ChartService.prototype.render = function (containerDom, widget, optionFilter, reload, persist, relations) {
        var self = this;
        var sub = new rxjs_1.Subject();
        var chart = this.getChartServices(widget.config);
        this.chartdataService.getDataSeries(widget.datasource, widget.query, widget.datasetId, widget.config, function (data) {
            var option;
            try {
                option = chart.parseOption(data);
                if (optionFilter) {
                    optionFilter(option);
                }
                if (data.drill) {
                    data.drill.drillDown = function (id, value, render) {
                        self.chartdataService.getDrillPath(widget.datasetId, id).subscribe(function (path) {
                            var i = 0;
                            _.each(path, function (e, _i) {
                                if (e.id === id) {
                                    i = _i;
                                }
                            });
                            var node = path[++i];
                            _.find(widget.config.keys, function (e, _i) {
                                if (e.id === id) {
                                    e.type = '=';
                                    e.values = [value];
                                    if (!_.find(widget.config.keys, function (e) {
                                        return e.id === node.id;
                                    })) {
                                        widget.config.keys.splice(_i + 1, 0, node);
                                    }
                                    return true;
                                }
                            });
                            _.find(widget.config.groups, function (e, _i) {
                                if (e.id === id) {
                                    e.type = '=';
                                    e.values = [value];
                                    if (!_.find(widget.config.groups, function (e) {
                                        return e.id === node.id;
                                    })) {
                                        widget.config.groups.splice(_i + 1, 0, node);
                                    }
                                    return true;
                                }
                            });
                            // 第六个参数reload
                            self.chartdataService.getDataSeries(widget.datasource, widget.query, widget.datasetId, widget.config, function (data) {
                                var option = chart.parseOption(data);
                                if (optionFilter) {
                                    optionFilter(option);
                                }
                                render(option, data.drill.config);
                            }, false);
                        });
                    };
                    data.drill.drillUp = function (id, render) {
                        _.find(widget.config.keys, function (e, _i) {
                            if (e.id === id) {
                                widget.config.keys[_i - 1].values = [];
                                widget.config.keys.splice(_i, 1);
                                return true;
                            }
                            return false;
                        });
                        _.find(widget.config.groups, function (e, _i) {
                            if (e.id === id) {
                                widget.config.groups[+_i - 1].values = [];
                                widget.config.groups.splice(_i, 1);
                                return true;
                            }
                            return false;
                        });
                        // 第六个参数reload
                        self.chartdataService.getDataSeries(widget.datasource, widget.query, widget.datasetId, widget.config, function (data) {
                            var option = chart.parseOption(data);
                            if (optionFilter) {
                                optionFilter(option);
                            }
                            render(option, data.drill.config);
                        }, false);
                    };
                }
            }
            finally {
                if (widget.config.chart_type === 'chinaMapBmap') {
                    sub.next(chart.render(containerDom, option, persist, data.drill));
                }
                else {
                    sub.next(chart.render(containerDom, option, persist, data.drill, relations, widget.config));
                }
            }
        }, reload);
        return sub;
    };
    ;
    ChartService.prototype.realTimeRender = function (realTimeTicket, widget, optionFilter, widgetWraper, isParamEvent) {
        if (!realTimeTicket) {
            return;
        }
        var chart = this.getChartServices(widget.config);
        if (isParamEvent && widgetWraper) {
            widgetWraper.loading = true;
        }
        var callback = function (data) {
            var option = chart.parseOption(data);
            if (optionFilter) {
                optionFilter(option);
            }
            realTimeTicket(option, data.drill ? data.drill.config : null);
            if (widgetWraper) {
                widgetWraper.loading = false;
            }
        };
        this.chartdataService.getDataSeries(widget.datasource, widget.query, widget.datasetId, widget.config, callback, true);
    };
    ;
    ChartService.prototype.getChartServices = function (chartConfig) {
        switch (chartConfig.chart_type) {
            case 'pie':
                return this.chartPieService;
            case 'line':
                return this.chartLineService;
            case 'kpi':
                return this.chartKpiService;
            case 'table':
                return this.chartTableService;
            case 'funnel':
                return this.chartFunnelService;
            case 'sankey':
                return this.chartSankeyService;
            case 'radar':
                return this.chartRadarService;
            case 'map':
                return this.chartMapService;
            case 'scatter':
                return this.chartScatterService;
            case 'gauge':
                return this.chartGaugeService;
            case 'wordCloud':
                return this.chartWordCloudService;
            case 'treeMap':
                return this.chartTreeMapService;
            case 'areaMap':
                return this.chartAreaMapService;
            case 'heatMapCalendar':
                return this.chartHeatMapCalendarService;
            case 'heatMapTable':
                return this.chartHeatMapTableService;
            case 'liquidFill':
                return this.chartLiquidFillService;
            case 'contrast':
                return this.chartContrastService;
            case 'chinaMap':
                return this.chartChinaMapService;
            case 'chinaMapBmap':
                return this.chartChinaMapBMapService;
            case 'relation':
                return this.chartRelationService;
            default:
                return null;
        }
    };
    var _a;
    ChartService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof index_1.DataService !== "undefined" && index_1.DataService) === "function" && _a || Object, chartLine_service_1.ChartLineService,
            chartTable_service_1.ChartTableService,
            chartPie_service_1.ChartPieService,
            chartKpi_service_1.ChartKpiService,
            chartFunnel_service_1.ChartFunnelService,
            chartSankey_service_1.ChartSankeyService,
            chartRadar_service_1.ChartRadarService,
            chartMap_service_1.ChartMapService,
            chartScatter_service_1.ChartScatterService,
            chartGauge_service_1.ChartGaugeService,
            chartWordCloud_service_1.ChartWordCloudService,
            chartTreeMap_service_1.ChartTreeMapService,
            chartAreaMap_service_1.ChartAreaMapService,
            chartHeatMapCalendar_service_1.ChartHeatMapCalendarService,
            chartHeatMapTable_service_1.ChartHeatMapTableService,
            chartLiquidFill_service_1.ChartLiquidFillService,
            chartContrast_service_1.ChartContrastService,
            chartChinaMap_service_1.ChartChinaMapService,
            chartChinaMapBmap_service_1.ChartChinaMapBMapService,
            chartRelation_service_1.ChartRelationService])
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;

//# sourceMappingURL=../../sourcemaps/src/chart/chart.service.js.map
