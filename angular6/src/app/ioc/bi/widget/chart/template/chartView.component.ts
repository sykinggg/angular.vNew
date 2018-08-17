import { Component, Input, OnChanges } from '@angular/core';

import { ChartService } from 'app/pack/common/src/index';

@Component({
    selector: 'widget-chart-view',
    template: require('./chartView.component.html!text')
})

export class ChartViewComponent implements OnChanges {
    constructor(
        private chartService: ChartService
    ) {}

    @Input() curWidget;
    @Input() datasource;
    @Input() customDs;


    tab;
    loadingPre;
    previewDivWidth = 12;
    loadFromCache = true;
    preview() {
        let self = this;
        this.tab = 'preview_widget2';
        $('#preview_widget').html("");
        // setTimeout(function () {
        //     $('#preview_widget_tab').trigger('click');
        // });
        this.loadingPre = false;
        // --- start ---
        // 添加echarts3.6.2后这里除了第一次可以加载echarts图表，再次加载无法显示图表。
        // 完全无法找到问题下，出于无奈嵌套了一层后发现可以显示图表。囧！！
        // 具体原因没有找到，求大神帮忙解决，thanks！
        $('#preview_widget').html("<div id='preview' [ngClass]=\"{}\" style='min-height: 450px; user-select: text;'></div>");
        // --- end ---
        var charType = this.curWidget.config.chart_type;
        //百度地图特殊处理
        if (charType == 'chinaMapBmap') {
            this.chartService.render($('#preview'), {
                config: this.curWidget.config,
                datasource: this.datasource ? this.datasource.id : null,
                query: this.curWidget.query,
                datasetId: this.customDs ? undefined : this.curWidget.datasetId
            });
            this.loadingPre = false;
        } else {
            this.chartService.render($('#preview'), {
                config: this.curWidget.config,
                datasource: this.datasource ? this.datasource.id : null,
                query: this.curWidget.query,
                datasetId: this.customDs ? undefined : this.curWidget.datasetId
            }, function (option) {
                switch (self.curWidget.config.chart_type) {
                    case 'line':
                        self.previewDivWidth = 12;
                        option.toolbox = {
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: true
                                }
                            }
                        };
                        break;
                    case 'pie':
                        self.previewDivWidth = 12;
                        option.toolbox = {
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: true
                                }
                            }
                        };
                        break;
                    case 'kpi':
                        self.previewDivWidth = 6;
                        break;
                    case 'table':
                        self.previewDivWidth = 12;
                        break;
                    case 'funnel':
                        self.previewDivWidth = 12;
                        option.toolbox = {
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: true
                                }
                            }
                        };
                        break;
                    case 'sankey':
                        self.previewDivWidth = 12;
                        option.toolbox = {
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: true
                                }
                            }
                        };
                        break;
                    case 'map':
                        // self.previewDivWidth = 12;
                        break;
                    case 'areaMap':
                        self.previewDivWidth = 12;
                        break;
                    case 'chinaMap':
                        self.previewDivWidth = 12;
                        break;
                    case 'relation':
                        self.previewDivWidth = 12;
                        break;
                }
                self.loadingPre = false;
            }, null, !self.loadFromCache);
            console.log(this.curWidget);
        }
    };

    ngOnChanges() {
        if(this.curWidget&&this.curWidget.config&&this.curWidget.config.chart_type) {
            this.preview();
        }
    }
}