import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode } from 'angular-tree-component';
import { TreeConfig } from 'app/pack/common/src/tree/tree-config';
import { TreeConfigService } from 'app/pack/common/src/tree/tree-config.service';
import { Observable } from 'rxjs/Observable';
import { ApiServer, DialogService } from 'core-services/core';
import { TranslateService } from '@ngx-translate/core';
import { REQUEST_OPTIONS } from 'app/pack/common/src/request-options';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
    template: require('./kpi.component.html!text')
})

export class ConfigKpiComponent implements OnInit {
    private requestOptions = REQUEST_OPTIONS;

    constructor(
        private treeService: TreeConfigService,
        private apiServer: ApiServer,
        private translate: TranslateService,
        private dialogService: DialogService,
    ) {}

    // tree -- 开始
    @ViewChild('dataSetTree') tree: TreeComponent;
    treeOptions: any = new TreeConfig();
    searchObservable: Observable<any>;

    // 初始化展开树
    initializedTree() {
        this.tree.treeModel.expandAll();
    }

    // 编辑
    editNode(node?: TreeNode) {
        if(!node && !this.treeService.checkTreeNode('edit', this.tree)) {
            return;
        }
        this.optFlag = 'edit';
        // 获取选择的值
        this.curKPI = this.getSelectedKPI(node);

        this.loadWidget(this.defaultWidget(this.curKPI.widgetIds));
    };
    // 初始化编辑下方拖动的widget
    defaultWidget(kpiWid) {
        let trueWidget = [];
        let idxList = {};
        this.curKPIWidgets = [];
        _.map(this.allWidget, (item, key) => {
            item.isCollapsed = false;
            let idx = kpiWid.indexOf(item.id);
            if(idx + 1) {
                idxList[idx] = item;
                // this.curKPIWidgets.push(item);
            }else{
                trueWidget.push(item);
            }
        })
        for(let idx in idxList) {
            this.curKPIWidgets.push(idxList[idx]);
        }
        this.allWidget = trueWidget;
        this.defaultRenderChart();
    };
    // 初始化widget的数据格式-因为要使用widget-board组件
    renderChart;
    defaultRenderChart() {
        this.renderChart = [];
        _.map(this.curKPIWidgets, (item) => {
            this.renderChart.push(
                {
                    widget: item,
                    name: item.name
                }
            )
        })
    }
    datasourceList
    curKPI: any = {};
    // 获取kpilist
    KPIList;
    getKPIList(callback?) {
        let self = this;
        this.apiServer.get("find-kpi", null, this.requestOptions).subscribe(function (response) {
            self.KPIList = response;
            if (callback) {
                callback();
            }
            self.searchNode();
        });
    };

    // 从后端的kpi分组数据和kpi列表数据组成tree
    keywords;
    originalData = [];
    searchNode() {
        let self = this;
        //map KPIList to list (add datasetName and datasourceName)
        if(!this.KPIList) {
            return;
        }
        let list = this.KPIList.map(function (w) {
            return {
                "id": w.kpiId,
                "name": w.kpiName || w.description || 'defaultName',
                "categoryName": w.categoryName || self.datasourceList[0].name || 'defaultName'
            };
        });
    
        // 搜索字段初始化
        if (this.keywords) {
            this.originalData = this.treeService.buildTree(list.filter((item: any) => {
                return item.name.indexOf(self.keywords)>-1
            }));
        }else{
            this.originalData = this.treeService.buildTree(list);
        }

        // 异步初始化tree
        setTimeout(() => {
            if (this.tree && this.tree.treeModel) {
                this.tree.treeModel.update();
                this.tree.treeModel.expandAll();
            }
        }, 500)
    };

    // 获取到当前的kpi分组
    loadDatasource() {
        let self = this;
        this.apiServer.get("categories", null, this.requestOptions).subscribe(function (response) {
            self.datasourceList = response;
            // 获取kpi数据
            self.getKPIList();
        });
    }
    // tree -- 结束

    // 编辑 -- 开始
    // 新增
    optFlag;
    newWgt(curKPI) {
        this.curKPI = {};
        if (curKPI) {
            this.curKPI = curKPI;
        }
        this.curKPI = {
            config: {
                option: {}
            },
            expressions: [],
            filterGroups: [],
            query: {}
        }
        this.curKPIWidgets = [];
        if(this.datasourceList) {
            this.curKPI.categoryId = this.datasourceList[0].id;
            this.curKPI.categoryName = this.datasourceList[0].name;
        }
        this.optFlag = 'new';
    };
    // 获取选择的KPI
    getSelectedKPI(node?: TreeNode) {
        let selectedNode = node || this.tree.treeModel.getActiveNode();

        return this.KPIList.filter((ds: any) => {
            return ds.kpiId === selectedNode.id;
        })[0];
    };
    // 删除
    deleteNode() {
        if (!this.treeService.checkTreeNode('delete', this.tree)) {
            return;
        }
        let KPI = this.getSelectedKPI()
        let self = this;
        this.dialogService.confirm(
            this.translate.instant('COMMON.CONFIRM_DELETE'), 'COMMON.TIP'
        ).result.then(function () {
            self.apiServer.post("delete-kpi", {kpiId: KPI.kpiId}, self.requestOptions).subscribe(function (serviceStatus: any) {
                console.log(serviceStatus);
                self.load();
                self.dialogService.alert(
                    self.translate.instant("COMMON.SUCCESS"),
                    "modal-success"
                );
                // if (serviceStatus.status == '1') {
                //     self.loadWidget(null);
                // } else {
                //     self.dialogService.show(serviceStatus.msg || self.translate.instant("COMMON.SUCCESS"), {windowClass: "modal-warning",size: "lg"});
                // }
                self.optFlag == 'none';
            });
        });
    };
    // 加载全部的widget
    allWidget;
    loadWidget(callback) {
        let self = this;
        this.apiServer.get('widgets-all', null, this.requestOptions).subscribe((res: any) => {
            self.allWidget = res;

            if(callback && typeof callback == 'function') {
                callback();
            }
        })
    }
    // 拖动
    dropSuccessData;
    dropSuccess() {
        if(this.dropSuccessData != JSON.stringify(this.curKPIWidgets)) {
            this.dropSuccessData = JSON.stringify(this.curKPIWidgets);
            this.defaultRenderChart();
        }
    }
    // 提交请求前的判断
    validate = false;
    vaData = [
        {
            key: 'kpiName',
            detection: 'exist'
        },
        {
            key: 'description',
            detection: 'exist'
        },
        {
            key: 'widgetIds',
            detection: 'length'
        }
    ]
    validateIng() {
        for(let key in this.vaData) {
            let item = this.vaData[key];
            switch (item.detection) {
                case 'exist':
                    if(!Boolean(this.curKPI[item.key])) {
                        return false;
                    }
                case 'length':
                    if(!Boolean(this.curKPI[item.key] && this.curKPI[item.key].length)) {
                        return false;
                    }
            }
        }
        return true;
    }
    // 保存
    curKPIWidgets;
    saveKPI() {
        this.validate = true;
        let a = [];
        let self = this;
        _.map(this.curKPIWidgets, (item) => {
            a.push(item.id);
        })
        this.curKPI.widgetIds = a;
        delete this.curKPI.config;
        delete this.curKPI.expressions;
        delete this.curKPI.filterGroups;
        delete this.curKPI.query;
        console.log(this.curKPI);
        if(!this.validateIng()) {
            return false;
        }
        let url = 'update-kpi';
        if(this.optFlag == "new") {
            url = 'save-kpi';
        }
        this.apiServer.post(url, {dataJson: JSON.stringify(this.curKPI)}, this.requestOptions).subscribe((res: any) => {
            self.load();
            self.dialogService.alert(
                self.translate.instant("COMMON.SUCCESS"),
                "modal-success"
            );
        })
    }
    // 编辑 -- 结束
    load() {
        // 获取树
        this.loadDatasource();

        // 获取所有widget
        this.loadWidget(null);
    }
    // 预览
    checkBeforPreviewShow = false;
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

        // 数据初始化
        this.load();
    }
}