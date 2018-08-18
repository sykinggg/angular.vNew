import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
import * as $ from 'jquery';

@Component({
    selector: 'kpi-tree',
    template: require('./tree.component.html!text')
})

export class KpiTreeComponent implements OnInit {
    private requestOptions = REQUEST_OPTIONS;

    constructor(
        private treeService: TreeConfigService,
        private apiServer: ApiServer,
        private translate: TranslateService,
        private dialogService: DialogService,
    ) {}

    @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

    // tree -- 开始
    @ViewChild('dataSetTree') tree: TreeComponent;
    treeOptions: any = new TreeConfig();
    searchObservable: Observable<any>;

    // 初始化展开树
    initializedTree() {
        this.tree.treeModel.expandAll();
    }

    // 编辑
    editNode(node?: TreeNode, event?) {
        if(!node && !this.treeService.checkTreeNode('edit', this.tree)) {
            return;
        }
        if(event) {
            this.tree.treeModel.setActiveNode(node, node);
        }
        
        // 获取选择的值
        this.curKPI = this.getSelectedKPI(node);

        this.dataChange.emit({
            curKPI: this.curKPI,
            allWidget: this.allWidget
        })
    };
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
        let defaultIndex = 0;
        let list = this.KPIList.map(function (w, key) {
            if(w.kpiId == self.saveId) {
                defaultIndex = key;
            }
            return {
                "id": w.kpiId,
                "name": w.kpiName || w.description || 'defaultName',
                "categoryName": w.categoryName || self.datasourceList[0].name || 'defaultName'
            };
        });

        if(defaultIndex) {
            list.unshift(list[defaultIndex]);
            list.splice(defaultIndex + 1, 1);
        }

    
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
                let node = $.extend($('.node-content-wrapper')[0], list[0]);
                this.tree.treeModel.setActiveNode(node, list[0]);
                self.editNode(list[0]);
                self.saveId = null;
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

    // 获取选择的KPI
    getSelectedKPI(node?: TreeNode) {
        let selectedNode = node || this.tree.treeModel.getActiveNode();

        return this.KPIList.filter((ds: any) => {
            return ds.kpiId === selectedNode.id;
        })[0];
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
                        self.editNode(node, $event);
                    }
                },
                click: (tree, node, $event) => {
                    if (!node.hasChildren) {
                        self.editNode(node, $event);
                    }
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