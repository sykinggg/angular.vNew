import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ITreeState, TreeComponent, TreeModel, TreeNode, ITreeOptions, KEYS } from 'angular-tree-component';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { TreeConfig, TreeConfigService } from 'app/pack/common/src/index';
import { Observable } from 'rxjs/Observable';
import { ApiServer, DialogService } from 'core-services/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { REQUEST_OPTIONS, DataService, UpdateService } from 'app/pack/common/src/index';

import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'widget-tree',
    template: require('./tree.component.html!text')
})

export class WidgetTreeComponent implements OnInit {

    private requestOptions = REQUEST_OPTIONS;

    constructor(
        private treeService: TreeConfigService,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private apiServer: ApiServer,
        private translate: TranslateService,
        private dialogService: DialogService,
        private dataService: DataService,
        private updateService: UpdateService,
    ) {}

    @ViewChild('dataSetTree') tree: TreeComponent;
    treeOptions: any = new TreeConfig();
    searchObservable: Observable<any>;
    customDs = false;

    initializedTree() {
        this.tree.treeModel.expandAll();
    }

    editNode(node?: TreeNode) {
        console.log(node);
        if(!node && !this.treeService.checkTreeNode('edit', this.tree)) {
            return;
        }
        // if (!this.checkTreeNode("edit")) return;
        // var selectedNode = jstree_GetSelectedNodes(treeID)[0];
        let selectedNode: any = node || this.tree.treeModel.getActiveNodes()[0];
        let navigationExtras: NavigationExtras = {
            queryParams: {
                id: selectedNode.data.id,
                notify: false,
                inherit: false
            }
        };
        this.router.navigate(['/admin/config/widget'], navigationExtras);
        // $state.go('config.widget', {id: selectedNode.id}, {notify: false, inherit: false});
        // this.editWgt(this.getSelectedWidget());
        this.editWgt(this.getSelectedWidget(node));
    };

    doConfigParams = function () {
        let self = this;
        this.apiServer.get('config-params', {
            type: this.datasource.type,
            datasourceId: this.datasource.id,
            page: 'widget.html'
        },
        this.requestOptions
        ).subscribe(function (response) {
            // self.params = response.data;
            self.params = response;
        });
    };

    editWgt(widget) {
        let self = this;
        this.apiServer.post("dashboard-checkWidget", {id: widget.id}, this.requestOptions).subscribe(function (response: any) {
            if (response.status == '1') {
                self.doEditWgt(widget);
                if (self.customDs == true) self.doConfigParams();
            } else {
                var d = widget.data.datasetId ? 'CONFIG.WIDGET.DATASET' : 'CONFIG.WIDGET.DATA_SOURCE';
                self.dialogService.alert(
                    self.translate.instant("ADMIN.CONTACT_ADMIN") + "：" + self.translate.instant(d) + '/' + response.msg,
                    "modal-danger"
                );
            }
        });
    };

    viewQueryMoal;
    cleanPreview() {
        $('#preview_widget').html("");
        $('#viewQuery_widget').html("");
        this.viewQueryMoal = false;
    };

    datasourceList
    curWidget: any = {};
    widgetType;
    doEditWgt(widget) {
        let self: any = this;
        this.cleanPreview();
        // setTimeout(function () {
        //     this.switchNode(widget.id)
        // }, 500);
        // this.switchNode(widget.id);
        $('#preview_widget').html('');
        this.curWidget = _.clone(widget.data);
        if(this.curWidget.config.chart_type == 'kpi') {
            self.changeChart('kpi');
        }
        if (!this.curWidget.expressions) {
            this.curWidget.expressions = [];
        }
        if (!this.curWidget.filterGroups) {
            this.curWidget.filterGroups = [];
        }
        this.updateService.updateConfig(this.curWidget.config);
        this.datasource = _.find(this.datasourceList, function (ds) {
            return ds.id == widget.data.datasource;
        });
    
        this.widgetName = _.clone(widget.categoryName + "/" + widget.name);

        if(widget&&widget.data&&widget.data.widgetType) {
            this.widgetType = _.clone(widget.data.widgetType);
        }else{
            this.widgetType = 'detail';
        }
    
        this.widgetId = widget.id;
        this.optFlag = 'edit';
        this.customDs = _.isUndefined(this.curWidget.datasetId);
        this.loadDataset(function () {
            self.loadDsExpressions();
            self.loadDsFilterGroups();
            self.buildSchema();
            self.dataService.linkDataset(self.curWidget.datasetId, self.curWidget.config);
        });
        this.addWatch();
    };

    widgetList;
    getWidgetList(callback?) {
        let self = this;
        this.apiServer.get("dashboard-widgets", null, this.requestOptions).subscribe(function (response) {
            self.widgetList = response;
            if (callback) {
                callback();
            }
            self.searchNode();
        });
    };

    keywords;
    originalData = [];
    searchNode() {
        let self = this;
        var para = {wgtName: '', dsName: '', dsrName: ''};
    
        //map widgetList to list (add datasetName and datasourceName)
        if(!this.widgetList) {
            return;
        }
        var list = this.widgetList.map(function (w) {
            var ds = _.find(self.datasetList, function (obj) {
                return obj.id == w.data.datasetId
            });
            var dsrName = '';
            var dsr;
            if (ds) {
                dsr = _.find(self.datasourceList, function (obj) {
                    return obj.id == ds.data.datasource
                });
            } else if (w.data.datasource) {
                dsr = _.find(self.datasourceList, function (obj) {
                    return obj.id == w.data.datasource
                });
            }
            return {
                "id": w.id,
                "name": w.name,
                "categoryName": w.categoryName,
                "datasetName": ds ? ds.name : '',
                "datasourceName": dsr ? dsr.name : dsrName
            };
        });
    
        //split search keywords
        if (this.keywords) {
            if (this.keywords.indexOf(' ') == -1 && this.keywords.indexOf(':') == -1) {
                para.wgtName = this.keywords;
            } else {
                var keys = this.keywords.split(' ');
                for (var i = 0; i < keys.length; i++) {
                    var w = keys[i].trim();
                    if (w.split(':')[0] == 'wg') {
                        para["wgtName"] = w.split(':')[1];
                    }
                    if (w.split(':')[0] == 'ds') {
                        para["dsName"] = w.split(':')[1];
                    }
                    if (w.split(':')[0] == 'dsr') {
                        para["dsrName"] = w.split(':')[1];
                    }
                }
            }
            // item.name.indexOf(para.dsName)>-1 && item.name.indexOf(para.wgtName)>-1 && item.datasourceName.indexOf(para.dsrName)>-1;
            this.originalData = this.treeService.buildTree(list.filter((item: any) => {
                return item.name.indexOf(para.dsName)>-1 && item.name.indexOf(para.wgtName)>-1 && item.datasourceName.indexOf(para.dsrName)>-1;
            }));
        }else{
            this.originalData = this.treeService.buildTree(list);
        }

        setTimeout(() => {
            if (this.tree && this.tree.treeModel) {
                this.tree.treeModel.update();
                this.tree.treeModel.expandAll();
            }
        }, 500)
        
        //filter data by keywords
        // originalData = jstree_CvtVPath2TreeData(
        //     $filter('filter')(list, {name: para.wgtName, datasetName: para.dsName, datasourceName: para.dsrName})
        // );
    
        // jstree_ReloadTree(treeID, originalData);
    };

    loadDatasource() {
        let self = this;
        this.apiServer.get("sources", null, this.requestOptions).subscribe(function (response) {
            self.datasourceList = response;
            self.getCategoryList();
            self.getWidgetList(function () {
                if (self.activeRouter.snapshot.queryParams.id) {
                    self.editWgt(_.find(self.widgetList, function (w) {
                        return w.id == self.activeRouter.snapshot.queryParams.id;
                    }));
                } else if (self.activeRouter.snapshot.queryParams.id == null && self.activeRouter.snapshot.queryParams.datasetId) {
                    self.newWgt({datasetId: parseInt(self.activeRouter.snapshot.queryParams.datasetId)});
                    self.loadData();
                }
            });
        });
    }

    datasetFormGroup: FormGroup;
    toChartDisabled = true;
    filterSelect = {};
    loadData() {
        let self = this;
        this.curWidget.query = this.datasetFormGroup.value;
        this.toChartDisabled = false;
        this.newConfig();
        this.filterSelect = {};
        this.loadDataset(function () {
            self.curWidget.expressions = [];
            self.loadDsExpressions();
            self.curWidget.filterGroups = [];
            self.loadDsFilterGroups();
            self.buildSchema();
        });
        this.cleanPreview();
    };

    dataset;
    datasetList;
    schema;
    alerts
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
            this.dataService.getColumns({
                datasource: this.datasource ? this.datasource.id : null,
                query: this.curWidget.query,
                datasetId: this.customDs ? undefined : this.curWidget.datasetId,
                reload: !this.loadFromCache,
                callback: function (dps) {
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
            if(dataset.data && dataset.data.expressions) {
                dsExp = dataset.data.expressions;
            }
            if (dsExp) {
                _.each(dsExp, function (e) {
                    self.curWidget.expressions.push(e);
                });
            }
        }
    };

    loadDataset(callback?) {
        let self = this;
        this.apiServer.get("datasets", null, this.requestOptions).subscribe(function (response) {
            self.datasetList = response;
            if (callback) {
                callback();
            }
        });
    };

    columns;
    newConfig() {
        this.curWidget.config = {};
        this.curWidget.config.option = {};
        this.curWidget.config.chart_type = 'table';
        this.cleanPreview();
        this.curWidget.config.selects = _.clone(this.columns);
        this.curWidget.config.keys = [];
        this.curWidget.config.groups = [];
        this.curWidget.config.values = [{name: '', cols: []}];
        this.curWidget.config.filters = [];
        if(!this.curWidget.config.province) {
            this.curWidget.config.province = {
                code: ''
            };
        }
        if(!this.curWidget.config.city) {
            this.curWidget.config.city = {
                code: ''
            };
        }
        this.addWatch();
    };

    disKeysGroups = [];
    addWatch() {
        let self = this;
        // this.$watch('curWidget.config.keys', changeChartStatus, true);
        // this.$watch('curWidget.config.groups', changeChartStatus, true);
        // this.$watch('curWidget.config.values', changeChartStatus, true);
        // this.$watch('curWidget.config.filters', changeChartStatus, true);
        this.addHelpMessage();
        this.addValidateWatch();
        // 暂时隐藏
        this.changeChartStatus();
        if(!this.curWidget || !this.curWidget.config) {
            return;
        }
        if(!this.curWidget.config.province) {
            this.curWidget.config.province = {
                code: ''
            };
        }
        if(!this.curWidget.config.city) {
            this.curWidget.config.city = {
                code: ''
            };
        }
        if(this.curWidget.config.groups) {
            _.map(this.curWidget.config.groups, (item) => {
                self.disKeysGroups.push(item.id);
            })
        }
        if(this.curWidget.config.keys) {
            _.map(this.curWidget.config.keys, (item) => {
                self.disKeysGroups.push(item.id);
            })
        }
        // if(this.curWidget.config.filters) {
        //     _.map(this.curWidget.config.keys, (item) => {
        //         self.disfilterGroup.push(item.id);
        //     })
        // }
    };

    changeChartStatus() {
        for (var type in this.chart_types_status) {
            var rule = this.configRule[type];
            var config = this.curWidget.config;
            var flattenValues = [];
            _.each(config.values, function (v) {
                flattenValues = flattenValues.concat(v.cols);
            });
            if (_.size(config.keys) == 0 && _.size(config.groups) == 0 && _.size(flattenValues) == 0) {
                r = false;
            } else {
                for (var k in rule) {
                    var r = true;
                    if (rule[k] == 2) {
                        if (k == 'values') {
                            r = (_.size(flattenValues) >= 1);
                            if (type == 'contrast') {
                                r = (_.size(flattenValues) == 2); //限制values数量为2
                            }
                        } else {
                            r = (_.size(config[k]) >= 1);
                        }
                    } else if (rule[k] != -1) {
                        if (k == 'values') {
                            r = (_.size(flattenValues) == rule[k]);
                        } else {
                            r = (_.size(config[k]) == rule[k]);
                        }
                    }
                    if (!r) {
                        this.chart_types_status[type] = r;
                        break;
                    }
                }
            }
            this.chart_types_status[type] = r;
        }
    };

    /***************************************
     *  0:  None items
     *  1:  only 1 item
     * -1:  None Restrict
     *  2:  1 or more
     ***************************************/
    configRule = {
        line: {keys: 2, groups: -1, filters: -1, values: 2},
        pie: {keys: 2, groups: -1, filters: -1, values: 2},
        kpi: {keys: 0, groups: 0, filters: -1, values: 1},
        table: {keys: -1, groups: -1, filters: -1, values: -1},
        funnel: {keys: -1, groups: 0, filters: -1, values: 2},
        sankey: {keys: 2, groups: 2, filters: -1, values: 1},
        radar: {keys: 2, groups: -1, filters: -1, values: 2},
        map: {keys: 2, groups: -1, filters: -1, values: 2},
        scatter: {keys: 2, groups: -1, filters: -1, values: 2},
        gauge: {keys: 0, groups: 0, filters: -1, values: 1},
        wordCloud: {keys: 2, groups: 0, filters: -1, values: 1},
        treeMap: {keys: 2, groups: 0, filters: -1, values: 1},
        areaMap: {keys: 2, groups: -1, filters: -1, values: 1},
        heatMapCalendar: {keys: 1, groups: 0, filters: -1, values: 1},
        heatMapTable: {keys: 2, groups: 2, filters: -1, values: 1},
        liquidFill: {keys: 0, groups: 0, filters: -1, values: 1},
        contrast: {keys: 1, groups: 0, filters: -1, values: 2},
        chinaMap:{keys: 2, groups: -1, filters: -1, values: 2},
        chinaMapBmap:{keys: 2, groups: -1, filters: -1, values: 2},
        relation: {keys: 2, groups: 2, filters: -1, values: 1}
    };

    chart_types_status = {
        "line": true, "pie": true, "kpi": true, "table": true,
        "funnel": true, "sankey": true, "radar": true, "map": true,
        "scatter": true, "gauge": true, "wordCloud": true, "treeMap": true,
        "heatMapCalendar": true, "heatMapTable": true, "liquidFill": true,
        "areaMap": true, "contrast": true,"chinaMap":true,"chinaMapBmap":true,"relation":true
    };

    addHelpMessage() {
        var rowKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".ROW";
        var columnKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".COLUMN";
        var filterKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".FILTER";
        var valueKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".VALUE";
        var row = this.translate.instant(rowKey) == rowKey ? null : this.translate.instant(rowKey);
        var column = this.translate.instant(columnKey) == columnKey ? null : this.translate.instant(columnKey);
        var filter = this.translate.instant(filterKey) == filterKey ? null : this.translate.instant(filterKey);
        var value = this.translate.instant(valueKey) == valueKey ? null : this.translate.instant(valueKey);
        this.helpMessage = {row: row, column: column, filter: filter, value: value};
    };

    helpMessage = {
        row: '', 
        column: '', 
        filter: '', 
        value: ''
    };

    addValidateWatch() {
        // this.$watch('widgetName', this.clearAlert, true);
        // this.$watch('curWidget.datasetId', this.clearAlert, true);
    };

    widgetName;
    widgetCategory;
    widgetId;
    optFlag;
    liteMode;
    newWgt(curWidget) {
        this.curWidget = {};
        if (curWidget) {
            this.curWidget = curWidget;
        }
        this.curWidget.config = {};
        this.curWidget.config.option = {};
        this.curWidget.expressions = [];
        this.curWidget.filterGroups = [];
        this.curWidget.query = {};
        this.datasource = null;
        this.widgetName = null;
        this.widgetCategory = null;
        this.widgetId = null;
        this.optFlag = 'new';
        this.customDs = false;
        this.schema = null;
        this.liteMode = false;
        this.cleanPreview();
        this.addValidateWatch();
    };

    categoryList;
    getCategoryList() {
        let self = this;
        this.apiServer.get("dashboard-widgetsCategory", null, this.requestOptions).subscribe(function (response) {
            self.categoryList = response;
            // $("#widgetName").autocomplete({
            //     source: this.categoryList
            // });
        });
    };

    getSelectedWidget(node?: TreeNode) {
        // var selectedNode = jstree_GetSelectedNodes(treeID)[0];
        // return _.find(this.widgetList, function (w) {
        //     return w.id == selectedNode.id;
        // });
        let selectedNode = node || this.tree.treeModel.getActiveNode();

        return this.widgetList.filter((ds: any) => {
            return ds.id === selectedNode.id;
        })[0];
    };

    deleteNode() {
        // if (!this.checkTreeNode("delete")) return;
        // this.deleteWgt(this.getSelectedWidget());
        if (!this.treeService.checkTreeNode('delete', this.tree)) {
            return;
        }
        this.deleteWgt(this.getSelectedWidget());
    };

    deleteWgt(widget) {
        let self = this;
        this.dialogService.confirm(
                this.translate.instant('COMMON.CONFIRM_DELETE'), 'COMMON.TIP'
            ).result.then(function () {
                self.apiServer.post("dashboard-deleteWidget", {id: widget.id}, self.requestOptions).subscribe(function (serviceStatus: any) {
                    if (serviceStatus.status == '1') {
                        self.getWidgetList();
                    } else {
                        self.dialogService.show(serviceStatus.msg || self.translate.instant("COMMON.SUCCESS"), {windowClass: "modal-warning",size: "lg"});
                    }
                    self.optFlag == 'none';
                });
            });
    };

    ngOnInit() {
        let self = this;
        this.treeOptions.actionMapping = {
            mouse: {
                dblClick: (tree, node, $event) => {
                    if (!node.hasChildren) {
                        self.editNode(node);
                    }
                }
            },
            keys: {
                46: (tree, node, $event) => {
                    self.deleteNode();
                }
            }
        };

        // 搜索初始化
        this.searchObservable = new BehaviorSubject<string>(this.keywords).pipe(
            debounceTime(10),
            distinctUntilChanged()
        );
        this.searchObservable.subscribe((keywords: string) => {
            self.searchNode();
        });

        // 获取树
        this.loadDatasource();
    }
}