import { KPIWidget } from './kpiWidget';
import { WidgetType } from '../Widget';
import { DIModule } from '@ts-ioc/bootstrap';
import * as kpiTemp from '../kpiTemps';

@DIModule({
    provide: WidgetType.configType,
    imports: [
        kpiTemp
    ],
    providers: [

    ]
})

export class KPIConWidget extends KPIWidget {
    private requestOptions = kpiTemp.REQUEST_OPTIONS;
    constructor(
        public treeService: kpiTemp.TreeConfigService,
        public apiServer: kpiTemp.ApiServer,
        public translate: kpiTemp.TranslateService,
        public dialogService: kpiTemp.DialogService,
    ) {
        super(treeService, apiServer, translate, dialogService);
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
}