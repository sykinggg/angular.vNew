"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var angular_tree_component_1 = require("angular-tree-component");
var router_1 = require("@angular/router");
var tree_config_1 = require("app/shared/tree/tree-config");
var tree_config_service_1 = require("app/shared/tree/tree-config.service");
var core_2 = require("core-services/core");
var core_3 = require("@ngx-translate/core");
var request_options_1 = require("app/shared/request-options");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var operators_1 = require("rxjs/operators");
var data_service_1 = require("app/shared/data/data.service");
var update_service_1 = require("app/shared/data/update.service");
var _ = require("lodash");
var WidgetTreeComponent = /** @class */ (function () {
    function WidgetTreeComponent(treeService, router, activeRouter, apiServer, translate, dialogService, dataService, updateService) {
        this.treeService = treeService;
        this.router = router;
        this.activeRouter = activeRouter;
        this.apiServer = apiServer;
        this.translate = translate;
        this.dialogService = dialogService;
        this.dataService = dataService;
        this.updateService = updateService;
        this.requestOptions = request_options_1.REQUEST_OPTIONS;
        this.treeOptions = new tree_config_1.TreeConfig();
        this.customDs = false;
        this.doConfigParams = function () {
            var self = this;
            this.apiServer.get('config-params', {
                type: this.datasource.type,
                datasourceId: this.datasource.id,
                page: 'widget.html'
            }, this.requestOptions).subscribe(function (response) {
                // self.params = response.data;
                self.params = response;
            });
        };
        this.curWidget = {};
        this.originalData = [];
        this.toChartDisabled = true;
        this.filterSelect = {};
        this.loading = false;
        this.loadFromCache = true;
        this.switchLiteMode = function (mode) {
            if (mode) {
                this.liteMode = mode;
                // $parent.$parent.liteMode = mode;
            }
            else {
                this.liteMode = !this.liteMode;
                // $parent.$parent.liteMode = liteMode;
            }
        };
        this.disKeysGroups = [];
        /***************************************
         *  0:  None items
         *  1:  only 1 item
         * -1:  None Restrict
         *  2:  1 or more
         ***************************************/
        this.configRule = {
            line: { keys: 2, groups: -1, filters: -1, values: 2 },
            pie: { keys: 2, groups: -1, filters: -1, values: 2 },
            kpi: { keys: 0, groups: 0, filters: -1, values: 1 },
            table: { keys: -1, groups: -1, filters: -1, values: -1 },
            funnel: { keys: -1, groups: 0, filters: -1, values: 2 },
            sankey: { keys: 2, groups: 2, filters: -1, values: 1 },
            radar: { keys: 2, groups: -1, filters: -1, values: 2 },
            map: { keys: 2, groups: -1, filters: -1, values: 2 },
            scatter: { keys: 2, groups: -1, filters: -1, values: 2 },
            gauge: { keys: 0, groups: 0, filters: -1, values: 1 },
            wordCloud: { keys: 2, groups: 0, filters: -1, values: 1 },
            treeMap: { keys: 2, groups: 0, filters: -1, values: 1 },
            areaMap: { keys: 2, groups: -1, filters: -1, values: 1 },
            heatMapCalendar: { keys: 1, groups: 0, filters: -1, values: 1 },
            heatMapTable: { keys: 2, groups: 2, filters: -1, values: 1 },
            liquidFill: { keys: 0, groups: 0, filters: -1, values: 1 },
            contrast: { keys: 1, groups: 0, filters: -1, values: 2 },
            chinaMap: { keys: 2, groups: -1, filters: -1, values: 2 },
            chinaMapBmap: { keys: 2, groups: -1, filters: -1, values: 2 },
            relation: { keys: 2, groups: 2, filters: -1, values: 1 }
        };
        this.chart_types_status = {
            "line": true, "pie": true, "kpi": true, "table": true,
            "funnel": true, "sankey": true, "radar": true, "map": true,
            "scatter": true, "gauge": true, "wordCloud": true, "treeMap": true,
            "heatMapCalendar": true, "heatMapTable": true, "liquidFill": true,
            "areaMap": true, "contrast": true, "chinaMap": true, "chinaMapBmap": true, "relation": true
        };
        this.helpMessage = {
            row: '',
            column: '',
            filter: '',
            value: ''
        };
    }
    WidgetTreeComponent.prototype.initializedTree = function () {
        this.tree.treeModel.expandAll();
    };
    WidgetTreeComponent.prototype.editNode = function (node) {
        console.log(node);
        if (!node && !this.treeService.checkTreeNode('edit', this.tree)) {
            return;
        }
        // if (!this.checkTreeNode("edit")) return;
        // var selectedNode = jstree_GetSelectedNodes(treeID)[0];
        var selectedNode = node || this.tree.treeModel.getActiveNodes()[0];
        var navigationExtras = {
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
    ;
    WidgetTreeComponent.prototype.editWgt = function (widget) {
        var self = this;
        this.apiServer.post("dashboard-checkWidget", { id: widget.id }, this.requestOptions).subscribe(function (response) {
            if (response.status == '1') {
                self.doEditWgt(widget);
                if (self.customDs == true)
                    self.doConfigParams();
            }
            else {
                var d = widget.data.datasetId ? 'CONFIG.WIDGET.DATASET' : 'CONFIG.WIDGET.DATA_SOURCE';
                self.dialogService.alert(self.translate.instant("ADMIN.CONTACT_ADMIN") + "：" + self.translate.instant(d) + '/' + response.msg, "modal-danger");
            }
        });
    };
    ;
    WidgetTreeComponent.prototype.cleanPreview = function () {
        $('#preview_widget').html("");
        $('#viewQuery_widget').html("");
        this.viewQueryMoal = false;
    };
    ;
    WidgetTreeComponent.prototype.doEditWgt = function (widget) {
        var self = this;
        this.cleanPreview();
        // setTimeout(function () {
        //     this.switchNode(widget.id)
        // }, 500);
        // this.switchNode(widget.id);
        $('#preview_widget').html('');
        this.curWidget = _.clone(widget.data);
        if (this.curWidget.config.chart_type == 'kpi') {
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
        if (widget && widget.data && widget.data.widgetType) {
            this.widgetType = _.clone(widget.data.widgetType);
        }
        else {
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
    ;
    WidgetTreeComponent.prototype.getWidgetList = function (callback) {
        var self = this;
        this.apiServer.get("dashboard-widgets", null, this.requestOptions).subscribe(function (response) {
            self.widgetList = response;
            if (callback) {
                callback();
            }
            self.searchNode();
        });
    };
    ;
    WidgetTreeComponent.prototype.searchNode = function () {
        var _this = this;
        var self = this;
        var para = { wgtName: '', dsName: '', dsrName: '' };
        //map widgetList to list (add datasetName and datasourceName)
        if (!this.widgetList) {
            return;
        }
        var list = this.widgetList.map(function (w) {
            var ds = _.find(self.datasetList, function (obj) {
                return obj.id == w.data.datasetId;
            });
            var dsrName = '';
            var dsr;
            if (ds) {
                dsr = _.find(self.datasourceList, function (obj) {
                    return obj.id == ds.data.datasource;
                });
            }
            else if (w.data.datasource) {
                dsr = _.find(self.datasourceList, function (obj) {
                    return obj.id == w.data.datasource;
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
            }
            else {
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
            this.originalData = this.treeService.buildTree(list.filter(function (item) {
                return item.name.indexOf(para.dsName) > -1 && item.name.indexOf(para.wgtName) > -1 && item.datasourceName.indexOf(para.dsrName) > -1;
            }));
        }
        else {
            this.originalData = this.treeService.buildTree(list);
        }
        setTimeout(function () {
            if (_this.tree && _this.tree.treeModel) {
                _this.tree.treeModel.update();
                _this.tree.treeModel.expandAll();
            }
        }, 500);
        //filter data by keywords
        // originalData = jstree_CvtVPath2TreeData(
        //     $filter('filter')(list, {name: para.wgtName, datasetName: para.dsName, datasourceName: para.dsrName})
        // );
        // jstree_ReloadTree(treeID, originalData);
    };
    ;
    WidgetTreeComponent.prototype.loadDatasource = function () {
        var self = this;
        this.apiServer.get("sources", null, this.requestOptions).subscribe(function (response) {
            self.datasourceList = response;
            self.getCategoryList();
            self.getWidgetList(function () {
                if (self.activeRouter.snapshot.queryParams.id) {
                    self.editWgt(_.find(self.widgetList, function (w) {
                        return w.id == self.activeRouter.snapshot.queryParams.id;
                    }));
                }
                else if (self.activeRouter.snapshot.queryParams.id == null && self.activeRouter.snapshot.queryParams.datasetId) {
                    self.newWgt({ datasetId: parseInt(self.activeRouter.snapshot.queryParams.datasetId) });
                    self.loadData();
                }
            });
        });
    };
    WidgetTreeComponent.prototype.loadData = function () {
        var self = this;
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
    ;
    WidgetTreeComponent.prototype.buildSchema = function () {
        var self = this;
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
        }
        else {
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
                        self.schema = { selects: [] };
                        _.each(dps.columns, function (e) {
                            self.schema.selects.push({ column: e });
                        });
                        self.switchLiteMode(true);
                    }
                    else {
                        self.alerts = [{ msg: dps.msg, type: 'danger' }];
                    }
                }
            });
        }
    };
    ;
    WidgetTreeComponent.prototype.loadDsFilterGroups = function () {
        var self = this;
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
    ;
    WidgetTreeComponent.prototype.loadDsExpressions = function () {
        var self = this;
        if (!this.customDs && this.datasetList) {
            var dataset = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            });
            var dsExp;
            if (dataset.data && dataset.data.expressions) {
                dsExp = dataset.data.expressions;
            }
            if (dsExp) {
                _.each(dsExp, function (e) {
                    self.curWidget.expressions.push(e);
                });
            }
        }
    };
    ;
    WidgetTreeComponent.prototype.loadDataset = function (callback) {
        var self = this;
        this.apiServer.get("datasets", null, this.requestOptions).subscribe(function (response) {
            self.datasetList = response;
            if (callback) {
                callback();
            }
        });
    };
    ;
    WidgetTreeComponent.prototype.newConfig = function () {
        this.curWidget.config = {};
        this.curWidget.config.option = {};
        this.curWidget.config.chart_type = 'table';
        this.cleanPreview();
        this.curWidget.config.selects = _.clone(this.columns);
        this.curWidget.config.keys = [];
        this.curWidget.config.groups = [];
        this.curWidget.config.values = [{ name: '', cols: [] }];
        this.curWidget.config.filters = [];
        if (!this.curWidget.config.province) {
            this.curWidget.config.province = {
                code: ''
            };
        }
        if (!this.curWidget.config.city) {
            this.curWidget.config.city = {
                code: ''
            };
        }
        this.addWatch();
    };
    ;
    WidgetTreeComponent.prototype.addWatch = function () {
        var self = this;
        // this.$watch('curWidget.config.keys', changeChartStatus, true);
        // this.$watch('curWidget.config.groups', changeChartStatus, true);
        // this.$watch('curWidget.config.values', changeChartStatus, true);
        // this.$watch('curWidget.config.filters', changeChartStatus, true);
        this.addHelpMessage();
        this.addValidateWatch();
        // 暂时隐藏
        this.changeChartStatus();
        if (!this.curWidget || !this.curWidget.config) {
            return;
        }
        if (!this.curWidget.config.province) {
            this.curWidget.config.province = {
                code: ''
            };
        }
        if (!this.curWidget.config.city) {
            this.curWidget.config.city = {
                code: ''
            };
        }
        if (this.curWidget.config.groups) {
            _.map(this.curWidget.config.groups, function (item) {
                self.disKeysGroups.push(item.id);
            });
        }
        if (this.curWidget.config.keys) {
            _.map(this.curWidget.config.keys, function (item) {
                self.disKeysGroups.push(item.id);
            });
        }
        // if(this.curWidget.config.filters) {
        //     _.map(this.curWidget.config.keys, (item) => {
        //         self.disfilterGroup.push(item.id);
        //     })
        // }
    };
    ;
    WidgetTreeComponent.prototype.changeChartStatus = function () {
        for (var type in this.chart_types_status) {
            var rule = this.configRule[type];
            var config = this.curWidget.config;
            var flattenValues = [];
            _.each(config.values, function (v) {
                flattenValues = flattenValues.concat(v.cols);
            });
            if (_.size(config.keys) == 0 && _.size(config.groups) == 0 && _.size(flattenValues) == 0) {
                r = false;
            }
            else {
                for (var k in rule) {
                    var r = true;
                    if (rule[k] == 2) {
                        if (k == 'values') {
                            r = (_.size(flattenValues) >= 1);
                            if (type == 'contrast') {
                                r = (_.size(flattenValues) == 2); //限制values数量为2
                            }
                        }
                        else {
                            r = (_.size(config[k]) >= 1);
                        }
                    }
                    else if (rule[k] != -1) {
                        if (k == 'values') {
                            r = (_.size(flattenValues) == rule[k]);
                        }
                        else {
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
    ;
    WidgetTreeComponent.prototype.addHelpMessage = function () {
        var rowKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".ROW";
        var columnKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".COLUMN";
        var filterKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".FILTER";
        var valueKey = 'HELP_MESSAGE.' + this.curWidget.config.chart_type.toUpperCase() + ".VALUE";
        var row = this.translate.instant(rowKey) == rowKey ? null : this.translate.instant(rowKey);
        var column = this.translate.instant(columnKey) == columnKey ? null : this.translate.instant(columnKey);
        var filter = this.translate.instant(filterKey) == filterKey ? null : this.translate.instant(filterKey);
        var value = this.translate.instant(valueKey) == valueKey ? null : this.translate.instant(valueKey);
        this.helpMessage = { row: row, column: column, filter: filter, value: value };
    };
    ;
    WidgetTreeComponent.prototype.addValidateWatch = function () {
        // this.$watch('widgetName', this.clearAlert, true);
        // this.$watch('curWidget.datasetId', this.clearAlert, true);
    };
    ;
    WidgetTreeComponent.prototype.newWgt = function (curWidget) {
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
    ;
    WidgetTreeComponent.prototype.getCategoryList = function () {
        var self = this;
        this.apiServer.get("dashboard-widgetsCategory", null, this.requestOptions).subscribe(function (response) {
            self.categoryList = response;
            // $("#widgetName").autocomplete({
            //     source: this.categoryList
            // });
        });
    };
    ;
    WidgetTreeComponent.prototype.getSelectedWidget = function (node) {
        // var selectedNode = jstree_GetSelectedNodes(treeID)[0];
        // return _.find(this.widgetList, function (w) {
        //     return w.id == selectedNode.id;
        // });
        var selectedNode = node || this.tree.treeModel.getActiveNode();
        return this.widgetList.filter(function (ds) {
            return ds.id === selectedNode.id;
        })[0];
    };
    ;
    WidgetTreeComponent.prototype.deleteNode = function () {
        // if (!this.checkTreeNode("delete")) return;
        // this.deleteWgt(this.getSelectedWidget());
        if (!this.treeService.checkTreeNode('delete', this.tree)) {
            return;
        }
        this.deleteWgt(this.getSelectedWidget());
    };
    ;
    WidgetTreeComponent.prototype.deleteWgt = function (widget) {
        var self = this;
        this.dialogService.confirm(this.translate.instant('COMMON.CONFIRM_DELETE'), 'COMMON.TIP').result.then(function () {
            self.apiServer.post("dashboard-deleteWidget", { id: widget.id }, self.requestOptions).subscribe(function (serviceStatus) {
                if (serviceStatus.status == '1') {
                    self.getWidgetList();
                }
                else {
                    self.dialogService.show(serviceStatus.msg || self.translate.instant("COMMON.SUCCESS"), { windowClass: "modal-warning", size: "lg" });
                }
                self.optFlag == 'none';
            });
        });
    };
    ;
    WidgetTreeComponent.prototype.ngOnInit = function () {
        var self = this;
        this.treeOptions.actionMapping = {
            mouse: {
                dblClick: function (tree, node, $event) {
                    if (!node.hasChildren) {
                        self.editNode(node);
                    }
                }
            },
            keys: {
                46: function (tree, node, $event) {
                    self.deleteNode();
                }
            }
        };
        // 搜索初始化
        this.searchObservable = new BehaviorSubject_1.BehaviorSubject(this.keywords).pipe(operators_1.debounceTime(10), operators_1.distinctUntilChanged());
        this.searchObservable.subscribe(function (keywords) {
            self.searchNode();
        });
        // 获取树
        this.loadDatasource();
    };
    var _a, _b, _c;
    tslib_1.__decorate([
        core_1.ViewChild('dataSetTree'),
        tslib_1.__metadata("design:type", angular_tree_component_1.TreeComponent)
    ], WidgetTreeComponent.prototype, "tree", void 0);
    WidgetTreeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'widget-tree',
            template: '<div class=\"container-fluid py-2 border\" [ngClass]=\"{true:\'collapsed-box\'}[schema?true:false]\"><div class=\"box-header with-border\"><h1 class=\"d-inline h5\"><i class=\"fa fa-bar-chart-o\" aria-hidden=\"true\"></i> {{\'CONFIG.WIDGET.WIDGET\'|translate}}</h1><div class=\"float-right\"><i class=\"fa fa-info toolbar-icon\" (click)=\"showInfo()\" title=\"{{\'COMMON.INFORMATION\'|translate}}\"></i>&nbsp; <i class=\"fa fa-plus toolbar-icon\" (click)=\"newWgt()\" title=\"{{\'COMMON.NEW\'|translate}}\"></i>&nbsp; <i [ngClass]=\"{false: \'d-none\'}[!liteMode?true:false]\" class=\"fa fa-copy toolbar-icon\" (click)=\"copyNode()\" title=\"{{\'COMMON.COPY\'|translate}}\"></i> <i [ngClass]=\"{false: \'d-none\'}[!liteMode?true:false]\" class=\"fa fa-edit toolbar-icon\" (click)=\"editNode()\" title=\"{{\'COMMON.EDIT\'|translate}}\"></i> <i [ngClass]=\"{false: \'d-none\'}[!liteMode?true:false]\" class=\"fa fa-trash-alt toolbar-icon\" (click)=\"deleteNode()\" title=\"{{\'COMMON.DELETE\'|translate}}\"></i> <i class=\"fa fa-bars toolbar-icon\" data-widget=\"collapse\"></i></div></div><div class=\"box-body\"><input type=\"text\" class=\"form-control\" placeholder=\"Search\" [(ngModel)]=\"keywords\" (keyup)=\"searchObservable.next(keywords)\" title=\"dsr:kylin ds:Bill wg:test\"><div class=\"panel-body\" style=\"padding: 10px 0px; overflow-x: auto; font-size: small; max-height: 45vh\"><tree-root #dataSetTree=\"\" [nodes]=\"originalData\" [options]=\"treeOptions\" (initialized)=\"initializedTree()\" (moveNode)=\"moveNode($event)\"></tree-root></div></div></div>'
        }),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof tree_config_service_1.TreeConfigService !== "undefined" && tree_config_service_1.TreeConfigService) === "function" && _a || Object, router_1.Router,
            router_1.ActivatedRoute,
            core_2.ApiServer,
            core_3.TranslateService,
            core_2.DialogService, typeof (_b = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _b || Object, typeof (_c = typeof update_service_1.UpdateService !== "undefined" && update_service_1.UpdateService) === "function" && _c || Object])
    ], WidgetTreeComponent);
    return WidgetTreeComponent;
}());
exports.WidgetTreeComponent = WidgetTreeComponent;

//# sourceMappingURL=../../sourcemaps/src/widget/tree.component.js.map
