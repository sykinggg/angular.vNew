import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { REQUEST_OPTIONS, DataService, UpdateService } from 'app/pack/common/src/index';
import { ApiServer, DialogService } from 'core-services/core';

@Component({
    selector: 'widget-dataSource',
    template: require('./dataSource.component.html!text')
})

export class WidgetDataSourceComponent implements OnInit {
    constructor(
        private chartdataService: DataService,
        private chartUpdateService: UpdateService,
        private apiServer: ApiServer,
    ) {}

    refreshSchema() {
        let self = this;
        this.loadDataset(function () {
            self.curWidget.expressions = [];
            self.loadDsExpressions();
            self.curWidget.filterGroups = [];
            self.loadDsFilterGroups();
            self.buildSchema();
        });
    }

    @Input() curWidget;

    disKeysGroups = [];
    disselect = [];
    disexp = [];
    disFilterGroups = [];

    dataset;
    customDs = false;
    datasetList;
    alerts = [];
    loading = false;
    datasource;
    loadFromCache = true;
    buildSchema() {
        let self = this;
        var loadFromDataset = false;
        if (!this.customDs) {
            this.dataset = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            });
            if (self.dataset.data.schema && (self.dataset.data.schema.measure.length > 0 || self.dataset.data.schema.dimension.length > 0)) {
                loadFromDataset = true;
            }
        }
        if (loadFromDataset) {
            this.schema = this.dataset.data.schema;
            this.alerts = [];
            this.switchLiteMode(true);
        } else {
            this.loading = true;
            this.chartdataService.getColumns({
                datasource: this.datasource ? this.datasource.id : null,
                query: this.curWidget.query,
                datasetId: this.customDs ? undefined : this.curWidget.datasetId,
                reload: !this.loadFromCache,
                callback: function (dps) {
                    console.log(dps);
                    self.loading = false;
                    self.alerts = [];
                    if (dps.msg == "1") {
                        self.schema = {selects: []};
                        _.each(dps.columns, function (e) {
                            self.schema.selects.push({column: e});
                        });
                        self.switchLiteMode(true);
                    } else {
                        self.alerts = [{msg: dps.msg, type: 'danger'}];
                    }
                }
            });
        }
    };

    switchLiteMode = function (mode) {
        if (mode) {
            this.liteMode = mode;
            // $parent.$parent.liteMode = mode;
        } else {
            this.liteMode = !this.liteMode;
            // $parent.$parent.liteMode = liteMode;
        }
    }

    loadDsFilterGroups() {
        let self = this;
        if (!this.customDs) {
            var fg = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            }).data.filters;
            if (fg) {
                _.each(fg, function (e) {
                    self.curWidget.filterGroups.push(e);
                });
            }
        }
    };

    loadDsExpressions() {
        let self = this;
        if (!this.customDs && this.datasetList) {
            let dataset = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            })
            var dsExp;
            if(dataset && dataset.data && dataset.data.expressions) {
                dsExp = dataset.data.expressions;
            }
            if (dsExp) {
                _.each(dsExp, function (e) {
                    self.curWidget.expressions.push(e);
                });
            }
        }
    };

    private requestOptions = REQUEST_OPTIONS;
    loadDataset(callback?) {
        let self = this;
        this.apiServer.get("datasets", null, this.requestOptions).subscribe(function (response) {
            self.datasetList = response;
            if (callback) {
                callback();
            }
        });
    };

    ngOnInit() {
        // 获取Dataset
        this.loadDataset(this.refreshSchema);
    }
}