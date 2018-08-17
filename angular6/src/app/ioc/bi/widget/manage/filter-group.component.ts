import { Component, ComponentFactoryResolver } from '@angular/core';

import { AfterDialogInit, DialogService, DialogResult } from 'core-services/core';
import { DataService, ParamSelectorComponent } from 'app/pack/common/src/index';

@Component({
    template: require('./filter-group.component.html!text')
})

export class FilterGroupComponent implements AfterDialogInit {
    private componentFactoryResolver: ComponentFactoryResolver;
    data: any = {group: '', filters: []};
    curWidget: any;
    columnObjs;
    selects: Array<any> = [];
    col;
    datasource;

    constructor(
        private dialogService: DialogService,
        private chartdataService: DataService
    ) {}

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        let self = this;
        let oldClose = dialog.modal.close;

        this.columnObjs = dialog.data.columnObjs;
        this.datasource = dialog.data.datasource;
        this.curWidget = dialog.data.curWidget;

        dialog.modal.close = () => {
            oldClose(self.data);
        }
        this.componentFactoryResolver = dialog.data.componentFactoryResolver;
        if (dialog.data.col) {
            this.data = {...dialog.data.col};
        } else {
            this.data = {group: '', filters: []};
        }
    }

    addColumn(str) {
        this.data.filters.push({col: str, type: '=', values: []})
    }

    ok() {
        if (this.col) {
            this.col.group = this.data.group;
            this.col.filters = this.data.filters;
        } else {
            this.curWidget.filterGroups.push(this.data);
        }
        // $uibModalInstance.close();
    }

    editFilter(filter) {
        let self = this;
        this.dialogService.show({
            title: filter.name || filter.col,
            contentComponent: ParamSelectorComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                param: filter,
                filter: false,
                getSelects: function (byFilter, column, callback) {
                    self.chartdataService.getDimensionValues(self.datasource ? self.datasource.id : null, self.curWidget.query, self.curWidget.datasetId, column, undefined, function (filtered) {
                        callback(filtered);
                    });
                },
                ok: function (param) {
                    filter.type = param.type;
                    filter.values = param.values;
                }
            }
        }, {
            size: 'lg'
        }).result.then((data) => {
            filter.values = filter.values.filter((item: any) => {
                return !!item;
            });
        }, (reason: any) => {
            console.log(reason);
        })
    }
}