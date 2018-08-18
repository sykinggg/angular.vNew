import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { DataService } from 'app/pack/common/src/index';
import { ChartLineService } from './chartLine.service';
import { ChartTableService } from './chartTable.service';
import { ChartPieService } from './chartPie.service';
import { ChartKpiService } from './chartKpi.service';
import { ChartFunnelService } from './chartFunnel.service';
import { ChartSankeyService } from './chartSankey.service';
import { ChartRadarService } from './chartRadar.service';
import { ChartMapService } from './chartMap.service';
import { ChartScatterService } from './chartScatter.service';
import { ChartGaugeService } from './chartGauge.service';
import { ChartWordCloudService } from './chartWordCloud.service';
import { ChartTreeMapService } from './chartTreeMap.service';
import { ChartAreaMapService } from './chartAreaMap.service';
import { ChartHeatMapCalendarService } from './chartHeatMapCalendar.service';
import { ChartHeatMapTableService } from './chartHeatMapTable.service';
import { ChartLiquidFillService } from './chartLiquidFill.service';
import { ChartContrastService } from './chartContrast.service';
import { ChartChinaMapService } from './chartChinaMap.service';
import { ChartChinaMapBMapService } from './chartChinaMapBmap.service';
import { ChartRelationService } from './chartRelation.service';

@Injectable()

export class ChartService {
    constructor(
        private chartdataService: DataService,
        private chartLineService: ChartLineService,
        private chartTableService: ChartTableService,
        private chartPieService: ChartPieService,
        private chartKpiService: ChartKpiService,
        private chartFunnelService: ChartFunnelService,
        private chartSankeyService: ChartSankeyService,
        private chartRadarService: ChartRadarService,
        private chartMapService: ChartMapService,
        private chartScatterService: ChartScatterService,
        private chartGaugeService: ChartGaugeService,
        private chartWordCloudService: ChartWordCloudService,
        private chartTreeMapService: ChartTreeMapService,
        private chartAreaMapService: ChartAreaMapService,
        private chartHeatMapCalendarService: ChartHeatMapCalendarService,
        private chartHeatMapTableService: ChartHeatMapTableService,
        private chartLiquidFillService: ChartLiquidFillService,
        private chartContrastService: ChartContrastService,
        private chartChinaMapService: ChartChinaMapService,
        private chartChinaMapBMapService: ChartChinaMapBMapService,
        private chartRelationService: ChartRelationService
    ) {}

    public render(containerDom, widget, optionFilter?, reload?, persist?, relations?): Subject<any> {
        let self = this
        let sub = new Subject();
        let chart = this.getChartServices(widget.config);

        this.chartdataService.getDataSeries(widget.datasource, widget.query, widget.datasetId, widget.config, function(data) {
            let option: any;

            try {
                option = chart.parseOption(data);
                if (optionFilter) {
                    optionFilter(option);
                }
                if (data.drill) {
                    data.drill.drillDown = function (id, value, render) {
                        self.chartdataService.getDrillPath(widget.datasetId, id).subscribe(function (path) {
                            let i: any = 0;
                            _.each(path, function (e, _i) {
                                if (e.id === id) {
                                    i = _i;
                                }
                            });
                            let node = path[++i];
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
            } finally {
                if (widget.config.chart_type === 'chinaMapBmap') {
                    sub.next(chart.render(containerDom, option, persist, data.drill));
                } else {
                    sub.next(chart.render(containerDom, option, persist, data.drill, relations, widget.config));
                }
            }
        }, reload);

        return sub;
    };

    public realTimeRender(realTimeTicket, widget, optionFilter?, widgetWraper?, isParamEvent?: boolean) {
        if (!realTimeTicket) {
            return;
        }
        let chart = this.getChartServices(widget.config);

        if (isParamEvent && widgetWraper) {
            widgetWraper.loading = true;
        }

        let callback = function(data) {
            let option = chart.parseOption(data);

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

    public getChartServices(chartConfig) {
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
    }
}