import { Component, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import * as _ from 'lodash';

import { AfterDialogInit, DialogService, DialogResult } from 'core-services/core';
import { DataService, ParamSelectorComponent } from 'app/pack/common/src/index';

@Component({
    selector: '[id=config]',
    template: require('./config.component.html!text')
})

export class ConfigComponent{

    // 编辑对象
    @Input() curWidget;
    // 控制行和列的常量
    @Input() configRule;
    // 图标展示
    @Input() helpMessage = {
        column: ''
    };
    // 拖拽高亮变量
    @Input() targetHighlight;

    @Output() changeData: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private dialogService: DialogService,
        private chartdataService: DataService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
        
    }

    // 拖拽的回调函数
    dropNode(dropData) {
        if(dropData.type == 'dimension') {
            this.curWidget.config.groups.push(dropData);
        }
        let data = {
            dropData: {
                type: 'add',
                dataType: dropData.type,
                id: dropData.id
            },
            curWidget: this.curWidget
        }
        this.changeData.emit(data);
    };

    // 删除维度列
    deleteNode(idx) {
        let dropData = this.curWidget.config.groups.splice(idx, 1)[0];
        let data = {
            dropData: {
                type: 'delete',
                dataType: dropData.type,
                id: dropData.id
            },
            curWidget: this.curWidget
        }
        this.changeData.emit(data);
    }

    // 排序
    editSort(o) {
        switch (o.sort) {
            case 'asc':
                o.sort = 'desc';
                break;
            case 'desc':
                o.sort = undefined;
                break;
            default:
                o.sort = 'asc';
                break;
        }
        let data = {
            curWidget: this.curWidget
        }
        this.changeData.emit(data);
    };

    // 过滤条件编辑
    editFilter(setbackArr, setbackIdx) {
        console.log(setbackArr);
        console.log(setbackIdx);
        let self = this;
        let filter = setbackArr[setbackIdx];
        filter.values = filter.alias;
        this.dialogService.show({
            title: filter.alias,
            contentComponent: ParamSelectorComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                param: filter,
                filter: false,
                getSelects: function (byFilter, column, callback) {
                    let config;
                    if (byFilter) {
                        config = _.clone(self.curWidget.config);
                        var arr = _.findKey(self.curWidget.config, function (o) {
                            return o == setbackArr;
                        });
                        config[arr].splice(setbackIdx, 1);
                    }
                    self.chartdataService.getDimensionValues(undefined, self.curWidget.query, filter.id, filter.alias, undefined, function (filtered) {
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
            console.log(data);
            filter.values = filter.values.filter((item: any) => {
                return !!item;
            });
        }, (res) => {
            console.log(res);
        })
    }
}