import { Widget, WidgetType, IWidget } from '../Widget';
import { DIModule } from '@ts-ioc/bootstrap';
import { ViewChild } from '@angular/core';
import * as configtemp from '../configTemps';

@DIModule({
    provide: WidgetType.configType,
    imports: [
        configtemp
    ],
    providers: [

    ]
})

export interface IConfigWidget extends IWidget {
    
}

export class ConfigWidget extends Widget {
    constructor(
        private translate: configtemp.TranslateService,
        private apiServer: configtemp.ApiServer,
        private activeRouter: configtemp.ActivatedRoute,
        private chartdataService: configtemp.DataService,
        private chartUpdateService: configtemp.UpdateService,
        private dialogService: configtemp.DialogService,
        private router: configtemp.Router,
        private treeService: configtemp.TreeConfigService,
        private componentFactoryResolver: configtemp.ComponentFactoryResolver,
        private chartService: configtemp.ChartService,
        config: configtemp.NgbDropdownConfig
    ) {
        super();
        config.autoClose = false;
        this.$ = configtemp.jquery;
    }
    private requestOptions = configtemp.REQUEST_OPTIONS;
    // widget更新的接口
    updateUrl = "dashboard/updateWidget.do";
    liteMode = false;
    // widget的默认值
    tab = 'preview_widget2';
    // 20种图表的基础数据
    chart_types = [
        {
            name: this.translate.instant('CONFIG.WIDGET.TABLE'), value: 'table', class: 'cTable',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.LINE_BAR'), value: 'line', class: 'cLine',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.CONTRAST'), value: 'contrast', class: 'cContrast',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_2')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.SCATTER'), value: 'scatter', class: 'cScatter',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.PIE'), value: 'pie', class: 'cPie',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.KPI'), value: 'kpi', class: 'cKpi',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.FUNNEL'), value: 'funnel', class: 'cFunnel',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.SANKEY'), value: 'sankey', class: 'cSankey',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.RADAR'), value: 'radar', class: 'cRadar',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.MAP'), value: 'map', class: 'cMap',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.GAUGE'), value: 'gauge', class: 'cGauge',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.WORD_CLOUD'), value: 'wordCloud', class: 'cWordCloud',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.TREE_MAP'), value: 'treeMap', class: 'cTreeMap',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.HEAT_MAP_CALENDER'), value: 'heatMapCalendar', class: 'cHeatMapCalendar',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.HEAT_MAP_TABLE'), value: 'heatMapTable', class: 'cHeatMapTable',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.LIQUID_FILL'), value: 'liquidFill', class: 'cLiquidFill',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.AREA_MAP'), value: 'areaMap', class: 'cAreaMap',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.CHINA_MAP'), value: 'chinaMap', class: 'cChinaMap',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.CHINA_MAP_BMAP'), value: 'chinaMapBmap', class: 'cChinaMapBmap',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.RELATION'), value: 'relation', class: 'cRelation',
            row: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_2'),
            column: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1_2'),
            measure: this.translate.instant('CONFIG.WIDGET.TIPS_DIM_NUM_1')
        }
    ];
    // 默认widget的新增编辑状态
    widgetType = 'detail';
    // 后端的图表表达方式
    widget_type_choiceArr = [
        {
            name: this.translate.instant('CONFIG.WIDGET.DETAIL'),
            code: 'detail'
        },
        {
            name: this.translate.instant('CONFIG.WIDGET.AGG'),
            code: 'agg'
        }
    ]
    // 根据列维|行维|指标的限制是否允许相应的类型选择
    chart_types_status = {
        "line": true, "pie": true, "kpi": true, "table": true,
        "funnel": true, "sankey": true, "radar": true, "map": true,
        "scatter": true, "gauge": true, "wordCloud": true, "treeMap": true,
        "heatMapCalendar": true, "heatMapTable": true, "liquidFill": true,
        "areaMap": true, "contrast": true,"chinaMap":true,"chinaMapBmap":true,"relation":true
    };
    // 折线图的下属类型选择
    value_series_types = [
        {name: this.translate.instant('CONFIG.WIDGET.LINE'), value: 'line'},
        {name: this.translate.instant('CONFIG.WIDGET.AREA_LINE'),value:'arealine'},
        {name: this.translate.instant('CONFIG.WIDGET.STACKED_LINE'),value:'stackline'},
        {name: this.translate.instant('CONFIG.WIDGET.PERCENT_LINE'),value:'percentline'},
        {name: this.translate.instant('CONFIG.WIDGET.BAR'), value: 'bar'},
        {name: this.translate.instant('CONFIG.WIDGET.STACKED_BAR'), value: 'stackbar'},
        {name: this.translate.instant('CONFIG.WIDGET.PERCENT_BAR'), value: 'percentbar'},
        {name: this.translate.instant('CONFIG.WIDGET.POLAR_BAR'), value:'polarbar'}
    ];
    // 中国地图（本地）的下属类型选择
    china_map_types = [
        {name: this.translate.instant('CONFIG.WIDGET.SCATTER_MAP'), value: 'scatter'},
        {name: this.translate.instant('CONFIG.WIDGET.HEAT_MAP'), value: 'heat'},
        {name: this.translate.instant('CONFIG.WIDGET.MARK_LINE_MAP'), value: 'markLine'}
    ];
    // 默认的几种运算类型
    value_aggregate_types = [
        {name: 'sum', value: 'sum'},
        {name: 'count', value: 'count'},
        {name: 'avg', value: 'avg'},
        {name: 'max', value: 'max'},
        {name: 'min', value: 'min'},
        {name: 'distinct', value: 'distinct'}
    ];
    // 饼图的下属类型选择
    value_pie_types = [
        {name: this.translate.instant('CONFIG.WIDGET.PIE'), value: 'pie'},
        {name: this.translate.instant('CONFIG.WIDGET.DOUGHNUT'), value: 'doughnut'},
        {name: this.translate.instant('CONFIG.WIDGET.COXCOMB'), value: 'coxcomb'}
    ]
    // kpi option的颜色设置
    kpi_styles = [
        {name: this.translate.instant('CONFIG.WIDGET.AQUA'), value: 'bg-aqua'},
        {name: this.translate.instant('CONFIG.WIDGET.RED'), value: 'bg-red'},
        {name: this.translate.instant('CONFIG.WIDGET.GREEN'), value: 'bg-green'},
        {name: this.translate.instant('CONFIG.WIDGET.YELLOW'), value: 'bg-yellow'}
    ];
    // 矩形树图option
    treemap_styles = [
        {name: this.translate.instant('CONFIG.WIDGET.RANDOM'), value: 'random'},
        {name: this.translate.instant('CONFIG.WIDGET.MULTI'), value: 'multi'},
        {name: this.translate.instant('CONFIG.WIDGET.BLUE'), value: 'blue'},
        {name: this.translate.instant('CONFIG.WIDGET.RED'), value: 'red'},
        {name: this.translate.instant('CONFIG.WIDGET.GREEN'), value: 'green'},
        {name: this.translate.instant('CONFIG.WIDGET.YELLOW'), value: 'yellow'},
        {name: this.translate.instant('CONFIG.WIDGET.PURPLE'), value: 'purple'}
    ];

    heatmap_styles = [
        {name: this.translate.instant('CONFIG.WIDGET.BLUE'), value: 'blue'},
        {name: this.translate.instant('CONFIG.WIDGET.RED'), value: 'red'},
        {name: this.translate.instant('CONFIG.WIDGET.GREEN'), value: 'green'},
        {name: this.translate.instant('CONFIG.WIDGET.YELLOW'), value: 'yellow'},
        {name: this.translate.instant('CONFIG.WIDGET.PURPLE'), value: 'purple'}
    ];

    heatmap_date_format = [
        {name: 'yyyy-MM-dd', value: 'yyyy-MM-dd'},
        {name: 'yyyy/MM/dd', value: 'yyyy/MM/dd'},
        {name: 'yyyyMMdd', value: 'yyyyMMdd'}
    ];

    liquid_fill_style = [
        {name: this.translate.instant('CONFIG.WIDGET.CIRCLE'), value: 'circle'},
        {name: this.translate.instant('CONFIG.WIDGET.PIN'), value: 'pin'},
        {name: this.translate.instant('CONFIG.WIDGET.RECT'), value: 'rect'},
        {name: this.translate.instant('CONFIG.WIDGET.ARROW'), value: 'arrow'},
        {name: this.translate.instant('CONFIG.WIDGET.TRIANGLE'), value: 'triangle'},
        {name: this.translate.instant('CONFIG.WIDGET.ROUND_RECT'), value: 'roundRect'},
        {name: this.translate.instant('CONFIG.WIDGET.SQUARE'), value: 'square'},
        {name: this.translate.instant('CONFIG.WIDGET.DIAMOND'), value: 'diamond'}
    ];

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

    // 省市区的数据
    provinces;
    // 获取省市区的方法
    private getProvinces() {
        let self = this;
        $.getJSON('assets/plugins/FineMap/mapdata/citycode.json', function (data) {
            self.provinces = data.provinces;
        });
    }

    // 编辑widget页面样式
    switchLiteMode = function (mode) {
        if (mode) {
            this.liteMode = mode;
            // $parent.$parent.liteMode = mode;
        } else {
            this.liteMode = !this.liteMode;
            // $parent.$parent.liteMode = liteMode;
        }
    }

    //界面控制
    loading = false;
    toChartDisabled = true;
    optFlag = '';
    alerts = [];
    treeData = [];
    originalData = [];
    @ViewChild('dataSetTree') tree: configtemp.TreeComponent;
    treeOptions = new TreeConfig();
    searchObservable: configtemp.Observable<any>;
    treeID = 'widgetTreeID'; // Set to a same value with treeDom

    // 请求的数据
    datasource;
    widgetName;
    widgetCategory;
    widgetId;
    curWidget: any = {};
    previewDivWidth = 12;
    expressions = [];
    customDs = false;
    loadFromCache = true;
    filterSelect = {};
    verify = {widgetName: true};
    params = [];
    curDataset;

    datasetList;
    helpMessage = {
        row: '', 
        column: '', 
        filter: '', 
        value: ''
    };

    // 声明sql语句
    datasetFormGroup: configtemp.FormGroup;
    
    
    ngOnInit() {
        let self = this;
        // 获取省
        this.getProvinces();
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
        this.searchObservable = new configtemp.BehaviorSubject<string>(this.keywords).pipe(
            debounceTime(10),
            distinctUntilChanged()
        );
        this.searchObservable.subscribe((keywords: string) => {
            self.searchNode();
        });

        // 获取Dataset
        this.loadDataset();

        // 获取树
        this.loadDatasource();

        // 编辑sql语句初始化
        this.datasetFormGroup = new configtemp.FormGroup({});
    }

    ngAfterViewInit() {}

    // 获取Dataset
    loadDataset(callback?) {
        let self = this;
        this.apiServer.get("datasets", null, this.requestOptions).subscribe(function (response) {
            self.datasetList = response;
            if (callback) {
                callback();
            }
        });
    };
    
    // 获取树
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
    
    // 获取选择的数据集名称
    getCurDatasetName() {
        let self = this;
        if (this.customDs) {
            return this.translate.instant('CONFIG.WIDGET.NEW_QUERY');
        } else {
            var curDS = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            });
            return curDS ? curDS.name : null;
        }
    }
    
    // 获取dashboard widget列表
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
    
    // 获取widget 的分组名称
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
    
    // 过滤器编辑
    viewExp(exp) {
        this.dialogService.alert(
            exp.exp, 
            this.translate.instant('CONFIG.COMMON.CUSTOM_EXPRESSION') + ': ' + exp.alias,
            3500,
            {
                windowClass: 'modal-info',
                size: 'lg'
            });
    }
    
    // 过滤器编辑
    schema;
    editExp(col) {
        var columnObjs = this.schemaToSelect(this.schema);
        var aggregate = this.value_aggregate_types;
        var curWidget = this.curWidget;
        var ok;
        var data = {
            expression: '',
            alias: ''
        };
        if (!col) {
            ok = function (data) {
                this.curWidget.expressions.push({
                    type: 'exp',
                    exp: data.expression,
                    alias: data.alias
                });
            }
        } else {
            data.expression = col.exp;
            data.alias = col.alias;
            ok = function (data) {
                col.exp = data.expression;
                col.alias = data.alias;
            }
        }
    };
    
    // 加载数据
    loadData() {
        let self = this;
        // this.curWidget.query = this.datasetFormGroup.value;
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
    
    // 新增数据
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
    
    // 获取所选数据集的数据
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
    
    // 默认数据集过滤器提交数据时的过滤
    isDsExpression(o) {
        let self = this;
        if (this.customDs) {
            return false;
        } else {
            var dsExp = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            }).data.expressions;
            var exp = _.find(dsExp, function (e) {
                return (e.id && o.id == e.id) || o.alias == e.alias;
            });
            return !_.isUndefined(exp);
        }
    };
    
    // 默认widget过滤器提交数据时的过滤
    isDsFilter(o) {
        let self = this;
        if (this.customDs) {
            return false;
        } else {
            var fg = _.find(this.datasetList, function (ds) {
                return ds.id == self.curWidget.datasetId;
            }).data.filters;
            var f = _.find(fg, function (e) {
                return e.id && o.id == e.id;
            });
            return !_.isUndefined(f);
        }
    };
    
    // 加载数据集中的过滤条件
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
    
    // 初始化图表行维列维以及过滤条件拖动编辑的初始化
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
    
    // 根据不同的图标类型自定义的行维列维名称
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
    
    // 暂时弃用
    addValidateWatch() {
        // this.$watch('widgetName', this.clearAlert, true);
        // this.$watch('curWidget.datasetId', this.clearAlert, true);
    };
    clearAlert() {
        this.alerts = [];
        this.verify = {widgetName: true};
    };

    // 提交数据时的数据条件过滤
    validation() {
        this.alerts = [];
        this.verify = {widgetName: true};
        if (!this.widgetName) {
            this.alerts = [{
                msg: this.translate.instant('CONFIG.WIDGET.WIDGET_NAME') + this.translate.instant('COMMON.NOT_EMPTY'),
                type: 'danger'
            }];
            this.verify = {widgetName: false};
            $("#widgetName").focus();
            return false;
        }
        if (this.customDs == false && this.curWidget.datasetId == undefined) {
            this.alerts = [{
                msg: this.translate.instant('CONFIG.WIDGET.DATASET') + this.translate.instant('COMMON.NOT_EMPTY'),
                type: 'danger'
            }];
            return false;
        }
        if (this.customDs == true) {
            for (var i = 0; i < this.params.length; i++) {
                var name = this.params[i].name;
                var label = this.params[i].label;
                var required = this.params[i].required;
                var value = this.curWidget.query[name];
                if (required == true && value != 0 && (value == undefined || value == "")) {
                    var pattern = /([\w_\s\.]+)/;
                    var msg = pattern.exec(label);
                    if (msg && msg.length > 0)
                        msg = this.translate.instant(msg[0]);
                    else
                        msg = label;
                    this.alerts = [{msg: "[" + msg + "]" + this.translate.instant('COMMON.NOT_EMPTY'), type: 'danger'}];
                    this.verify[name] = false;
                    return false;
                }
            }
        }
        return true;
    };
    
    // 拖动行维列维的数据判断
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

    // 图标内部option设置切换
    optionLineType = 'grid';
    setOptionTab(type) {
        this.optionLineType = type;
        if(this.curWidget&&this.curWidget.config&&this.curWidget.config.option&&!this.curWidget.config.option.gridCustom) {
            this.curWidget.config.option.gridCustom = false;
        }
        if(this.curWidget&&this.curWidget.config&&this.curWidget.config.option&&!this.curWidget.config.option.legendShow) {
            this.curWidget.config.option.legendShow = true;
        }
        if(this.curWidget&&this.curWidget.config&&this.curWidget.config.option&&!this.curWidget.config.option.dataZoom) {
            this.curWidget.config.option.dataZoom=false
        }
        if(this.curWidget&&this.curWidget.config&&!this.curWidget.config.valueAxis) {
            this.curWidget.config.valueAxis = 'both'
        }
    }
    
    // 图标选择
    columns;
    changeChart(chart_type) {
        let self = this;
        if (!this.chart_types_status[chart_type]) {
            return;
        }
        var oldConfig = _.clone(this.curWidget.config);
        this.curWidget.config = {};
        this.curWidget.config.option = {};
        this.curWidget.config.chart_type = chart_type;
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
        //loadDsExpressions();
        this.cleanPreview();
    
        this.curWidget.config.selects = oldConfig.selects;
        this.curWidget.config.keys = oldConfig.keys;
        this.curWidget.config.groups = oldConfig.groups;
        this.curWidget.config.values = [];
    
        this.addHelpMessage();
    
        this.curWidget.config.filters = oldConfig.filters;
        switch (this.curWidget.config.chart_type) {
            case 'line':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.valueAxis = 'vertical';
                _.each(self.curWidget.config.values, function (v) {
                    v.series_type = 'line';
                    v.type = 'value';
                });
                break;
            case 'pie':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                _.each(self.curWidget.config.values, function (v) {
                    v.series_type = 'pie';
                    v.type = 'value';
                });
                break;
            case 'kpi':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.selects = _.clone(self.columns);
                _.each(self.curWidget.config.values, function (v) {
                    v.style = 'bg-aqua';
                });
                break;
            case 'scatter':
                var i = 0;
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        if (i >= 3) {
                            self.curWidget.config.selects.push(c.col);
                            return;
                        }
                        if (!self.curWidget.config.values[i]) {
                            self.curWidget.config.values[i] = {name: '', cols: []};
                        }
                        self.curWidget.config.values[i].cols.push(c);
                        i++
                    });
                });
                for (var i = 0; i < 3; i++) {
                    if (!self.curWidget.config.values[i]) {
                        self.curWidget.config.values[i] = {name: '', cols: []};
                    }
                }
                break;
            case 'gauge':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.selects = _.clone(self.columns);
                self.curWidget.config.styles = [
                    {proportion: '0.2', color: '#228b22'},
                    {proportion: '0.8', color: '#48b'},
                    {proportion: '1', color: '#ff4500'}
                ];
                break;
            case 'heatMapCalendar':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.selects = _.clone(self.columns);
                _.each(self.curWidget.config.values, function (v) {
                    v.dateFormat = 'yyyy-MM-dd';
                    v.style = 'blue';
                });
                break;
            case 'heatMapTable':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.selects = _.clone(self.columns);
                _.each(self.curWidget.config.values, function (v) {
                    v.style = 'blue';
                });
                break;
            case 'liquidFill':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.selects = _.clone(self.columns);
                self.curWidget.config.animation = 'static';
                _.each(self.curWidget.config.values, function (v) {
                    v.style = 'circle';
                });
                break;
            case 'chinaMap':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.valueAxis = 'vertical';
                _.each(self.curWidget.config.values, function (v) {
                    v.series_type = 'scatter';
                    v.type = 'value';
                });
                break;
            case 'chinaMapBmap':
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                self.curWidget.config.valueAxis = 'vertical';
                _.each(self.curWidget.config.values, function (v) {
                    v.series_type = 'scatter';
                    v.type = 'value';
                });
                break;
            default:
                self.curWidget.config.values.push({name: '', cols: []});
                _.each(oldConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        self.curWidget.config.values[0].cols.push(c);
                    });
                });
                break;
        }
        _.each(self.curWidget.config.values, function (v) {
            _.each(v.cols, function (c) {
                delete c.formatter;
            });
        });
        self.preview();
        self.ngViewInit();
    };
    
    // 图表默认option的是否编辑的初始化
    ngViewInit() {
        if(this.curWidget&&this.curWidget.config&&this.curWidget.config.option&&!this.curWidget.config.option.legendShow) {
            this.curWidget.config.option.legendShow = true;
        }
    }
    
    // 新增图表或编辑取数据之前对于图标的初始化
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
    
    // 图表下方渲染默认初始化
    viewQueryMoal;
    cleanPreview() {
        $('#preview_widget').html("");
        $('#viewQuery_widget').html("");
        this.viewQueryMoal = false;
    };
    
    // 图表下方的预览查询
    loadingPre;
    previewQuery() {
        let self = this;
        this.tab = 'viewQuery_widget';
        $('#viewQuery_widget').html("");
        // setTimeout(function () {
        //     $('#viewQuery_widget_tab').trigger('click');
        // });
        this.loadingPre = false;
        this.chartdataService.viewQuery({
            config: this.curWidget.config,
            datasource: this.datasource ? this.datasource.id : null,
            query: this.curWidget.query,
            datasetId: this.customDs ? undefined : this.curWidget.datasetId
        }, function (query) {
            self.loadingPre = false;
            self.viewQueryMoal = true;
            var querybr = query.trim().replace(/\n/g, '<br/>').replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            $('#viewQuery_widget').html("<div class='alert alert-info' role='alert' style='text-align: left;'><p style='color: black'>" + querybr + "</p></div>");
        });
    };

    // 图表默认的options的展示
    setTab(type) {
        this.tab = type;
        if(type == 'options') {
            this.getOptionsView();
        }
    }
    
    // 图表下方的预览
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
        }
    };
    
    // this.saveChart = function () {
    //     boardService.saveWidget('123', this.datasource, this.config);
    // };
    
    // 折线图轴的数据增加
    add_value() {
        this.curWidget.config.values.push({
            name: '',
            series_type: 'line',
            type: 'value',
            cols: []
        });
    };
    
    // 饼图轴的数据增加
    add_pie_value() {
        this.curWidget.config.values.push({
            name: '',
            series_type: 'pie',
            type: 'value',
            cols: []
        });
    }
    
    // 中国地图（本地）轴的数据增加
    add_china_map_value() {
        this.curWidget.config.values.push({
            name: '',
            series_type: 'scatter',
            type: 'value',
            cols: []
        });
    };
    
    // 图表(计量)样式添加
    add_style() {
        this.curWidget.config.styles.push({
            proportion: '',
            color: ''
        });
    };
    
    // 初始化颜色选择
    initColorPicker(index) {
        setTimeout(function() {
            $("#color_"+index).colorpicker()
                .on("changeColor", function(e){
                    if(this.curWidget.config.styles[e.target.id.split("_")[1]]){
                        this.curWidget.config.styles[e.target.id.split("_")[1]].color = e.color.toHex();
                    }
                });
        }, 100, true);
    };
    
    // 暂时弃用
    saveWgtCallBack(serviceStatus) {
        if (serviceStatus.status == '1') {
            this.getWidgetList();
            this.getCategoryList();
            this.dialogService.alert(
                this.translate.instant("COMMON.SUCCESS"), 
                "modal-success"
            );
        } else {
            this.dialogService.alert(
                serviceStatus.msg, 
                "modal-success"
            );
        }
    };
    
    // 保存
    saveWgt() {
        let self = this;
        this.liteMode = false;
        if (!this.validation()) {
            return;
        }
    
        var o: any = {};
        o.name = this.widgetName.slice(this.widgetName.lastIndexOf("/") + 1).trim();
        o.categoryName = this.widgetName.substring(0, this.widgetName.lastIndexOf("/")).trim();
        if (o.categoryName == '') {
            o.categoryName = this.translate.instant("COMMON.DEFAULT_CATEGORY");
        }
        o.data = {};
        o.data.config = this.curWidget.config;
        o.data.widgetType = this.widgetType;
        if (this.customDs) {
            o.data.query = this.curWidget.query;
            o.data.datasource = this.datasource.id;
        } else {
            o.data.datasetId = this.curWidget.datasetId;
        }
        o.data.expressions = _.filter(this.curWidget.expressions, function (e) {
            return !self.isDsExpression(e);
        });
        o.data.filterGroups = _.filter(this.curWidget.filterGroups, function (e) {
            return !self.isDsFilter(e);
        });
        this.alerts = [];
        this.verify = {widgetName: true};
    
        if (o.name == null || o.name == "") {
            self.alerts = [{
                msg: self.translate.instant('CONFIG.WIDGET.WIDGET_NAME') + this.translate.instant('COMMON.NOT_EMPTY'),
                type: 'danger'
            }];
            self.verify = {widgetName: false};
            $("#widgetName").focus();
            return;
        } else if (o.data.datasetId == undefined && this.customDs == false) {
            self.alerts = [{
                msg: self.translate.instant('CONFIG.WIDGET.DATASET') + this.translate.instant('COMMON.NOT_EMPTY'),
                type: 'danger'
            }];
            return;
        }
    
        // 新增编辑数据请求
        if (this.optFlag == 'new') {
            this.apiServer.post("dashboard-saveNewWidget", {json: JSON.stringify(o)}, this.requestOptions).subscribe(function (serviceStatus: any) {
                if (serviceStatus.status == '1') {
                    self.getWidgetList();
                    self.getCategoryList();
                    self.dialogService.alert(
                        self.translate.instant("COMMON.SUCCESS"),
                        "modal-success"
                    );
                } else {
                    self.alerts = [{msg: serviceStatus.msg, type: 'danger'}];
                }
            });
        } else if (this.optFlag == 'edit') {
            o.id = this.widgetId;
            this.apiServer.post('dashboard-updateWidget', {json: JSON.stringify(o)}, this.requestOptions).subscribe(function (serviceStatus: any) {
                if (serviceStatus.status == '1') {
                    self.getWidgetList();
                    self.getCategoryList();
                    self.dialogService.alert(
                        self.translate.instant("COMMON.SUCCESS"),
                        "modal-success"
                    );
                } else {
                    self.alerts = [{msg: serviceStatus.msg, type: 'danger'}];
                }
            });
        }
    };
    
    // 使用从数据源获取的数据进行初始化查找对应的widget数据
    editWgt(widget) {
        let self = this;
        this.apiServer.post("dashboard-checkWidget", {id: widget.id}, this.requestOptions).subscribe(function (response: any) {
            if (response.status == '1') {
                // 并将取得的数据在此处理
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
    
    // 从widget的list中找到当前的widget取得数据进行编辑初始化操作
    widgetList;
    editCurWgt() {
        let self = this;
        var wgt = _.find(this.widgetList, function (w) {
            return w.id == self.widgetId;
        });
        if (wgt) {
            self.editWgt(wgt);
        }
    };
    
    // 根据取得的widget数据进行编辑的初始化操作
    datasourceList
    doEditWgt(widget) {
        let self = this;
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
        this.chartUpdateService.updateConfig(this.curWidget.config);
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
            self.chartdataService.linkDataset(self.curWidget.datasetId, self.curWidget.config);
        });
        this.addWatch();
    };
    
    // 取消功能
    doCancel() {
        if (this.optFlag == 'new') {
            this.newConfig();
            this.filterSelect = {};
            this.cleanPreview();
        } else {
            this.editCurWgt();
        }
    }
    
    // 暂时弃用-维度列|可选表达式-(angular1.x用于filter过滤)
    filterDimension(e) {
        if (e.type == 'level') {
            return true;
        }
        var keys = _.find(this.curWidget.config.keys, function (k) {
            return k.col == e.column;
        });
        var groups = _.find(this.curWidget.config.groups, function (k) {
            return k.col == e.column;
        });
        return !(keys || groups);
    };
    
    // 暂时弃用-数据集-过滤器-(angular1.x用于过滤)
    filterExpressions(e) {
        var result = false;
        _.each(this.curWidget.config.values, function (v) {
            _.each(v.cols, function (c) {
                if (c.type == 'exp') {
                    if (e.id == c.id && e.alias == c.alias) {
                        result = true;
                    }
                }
            });
        });
        return !result;
    };
    
    // 暂时弃用-widget-过滤器-(angular1.x用于过滤)
    filterFilterGroup(e) {
        var result = false;
        _.each(this.curWidget.config.filters, function (f) {
            if (f.group) {
                if (e.id == f.id && e.group == f.group) {
                    result = true;
                }
            }
        });
        return !result;
    };
    
    // 下方数据源-刷新
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
    
    // 初始化widget下方数据集数据
    dataset;
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
    
    // 删除widget
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

    // 删除spl语句错误提示
    closeAlert(alert: any) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }

    // widget复制
    copyWgt(widget) {
        let self = this;
        var o = _.clone(widget);
        o.name = o.name + "_copy";
        this.apiServer.post("dashboard-saveNewWidget", {json: JSON.stringify(o)}, this.requestOptions).subscribe(function (serviceStatus: any) {
            if (serviceStatus.status == '1') {
                self.getWidgetList();
                self.dialogService.alert(
                    self.translate.instant("COMMON.SUCCESS"),
                    "modal-success"
                );
            } else {
                self.dialogService.alert(
                    serviceStatus.msg || self.translate.instant("COMMON.SUCCESS"),
                    "modal-warning"
                );
            }
            self.optFlag == 'none';
        });
    };
    
    // 
    // getQueryView() {
    //     if (this.datasource && this.datasource.name) {
    //         return 'dashboard/getConfigView.do?type=' + this.datasource.type;
    //     }
    // };
    
    // getChartView() {
    //     if (this.curWidget.config && this.curWidget.config.chart_type) {
    //         return 'org/cboard/view/config/chart/' + this.curWidget.config.chart_type + '.html';
    //     }
    // };
    
    // getOptionsView() {
    //     var basePath = 'org/cboard/view/config/chart/options/';
    //     if (this.curWidget.config && this.curWidget.config.chart_type) {
    //         return basePath + this.curWidget.config.chart_type + '.html';
    //     }
    // }
    
    // 删除图表轴的数据增加
    deleteValue(cols) {
        _.each(cols, function (e) {
            if (e.type == 'exp') {
                this.expressions.push(e);
            }
        });
    };

    // 拖拽到图表的设置
    toCol(list, index, item, type) {
        if (type == 'key' || type == 'group' || type == 'filter') {
            list[index] = {col: item.col, aggregate_type: 'sum'};
        } else if (type == 'select' || type == 'measure') {
            list[index] = {col: item.column, aggregate_type: 'sum'};
        }
        this.onDragCancle();
        // 拖动行维列维的数据判断
        this.changeChartStatus();
    }

    // 暂时弃用
    toSelect(list, index, item, type) {
        if (type == 'col') {
            list[index] = item.col;
        } else if (type == 'key' || type == 'group' || type == 'filter') {
            list[index] = item.col;
        }
        // 拖动行维列维的数据判断
        this.changeChartStatus();
    }

    // 拖拽到数据集中的行维|列维|过滤
    disKeysGroups = [];
    disFilterGroups = [];
    toKeysGroups(containerType, items, index) {
        let item = items.data;
        let type = items.type
        let list = this.curWidget.config[containerType];
        let sameLevel = ['filters', 'groups', 'keys', 'filterGroups'];
        if(!index) {
            index = list.length;
        }
        if (type == 'col') {
            list[index] = {col: item.col, type: 'eq', values: [], sort: 'asc'};
            this.disKeysGroups.push(items.data.id);
        } else if (type == 'dimension' || type == 'select') {
            list[index] = {
                alias: item.alias,
                col: item.column,
                level: item.level,
                type: 'eq',
                values: [],
                sort: 'asc'
            };
            if (type == 'dimension') {
                list[index].id = item.id;
            }
            this.disKeysGroups.push(items.data.id);
        } else if (sameLevel.indexOf(type)+1) {
            // 从过滤移动到列维|行维
            if(type == 'filters') {
                this.disKeysGroups.push(item.id);
            }
            // 从左侧的过滤移动到过滤条件
            if(type == 'filterGroups' && item.group) {
                this.disFilterGroups.push(item.group);
            }
            // 从列维|行维移动到过滤
            if(containerType == 'filters') {
                let disIdx = this.disKeysGroups.indexOf(item.id);
                this.disKeysGroups.splice(disIdx, 1);
            }
            list.push(item);
            let delList = items.delList;
            let delIdx = items.delIdx;
            if(delList) {
                delList.splice(delIdx, 1);
            }
        }
        // 拖动行维列维的数据判断
        this.changeChartStatus();
    }

    // 列维|行维|过滤 - 删除选择的过滤条件
    delKeysGroups(type, idx) {
        let list = this.curWidget.config[type];
        let item = list.splice(idx, 1);
        let keyGroupArr = ['groups', 'keys'];
        if(keyGroupArr.indexOf(type)+1) {
            let disIdx = this.disKeysGroups.indexOf(item.id);
            this.disKeysGroups.splice(disIdx);
        }else if(type == 'filters'){
            let disIdx = this.disFilterGroups.indexOf(item.group);
            this.disFilterGroups.splice(disIdx);
        }
        // 拖动行维列维的数据判断
        this.changeChartStatus();
    }

    // 暂时弃用
    attachLevel(column, level) {
        column.level = level.alias;
        return column;
    }

    disdimension = [];
    dismeasure = [];
    disselect = [];
    disexp = [];
    disfilterGroup = [];
    dndDisArr(items) {
        if(items.type && items.data) {
            if(!this['dis' + items.type]) {
                this['dis' + items.type] = [];
            }
            this['dis' + items.type].push(items.data.id);
        }
    }
    
    // 过滤-编辑
    selectsByFilter = [];
    selects = [];
    editFilter(setbackArr, setbackIdx) {
        let self = this;
        let filter = setbackArr[setbackIdx];

        let dialogConfig = {
            title: filter.col,
            contentComponent: ParamSelectorComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                param: filter,
                filter: false,
                getSelects: function(byFilter, column, callback) {
                    self.chartdataService.getDimensionValues(
                        self.datasource ? self.datasource.id: null,
                        self.curWidget.query,
                        self.curWidget.datasetId,
                        column,
                        undefined,
                        function(filtered) {
                            callback(filtered);
                        }
                    )
                },
                ok: function (param) {
                    filter.type = param.type;
                    filter.values = param.values;
                }
            }
        }
        this.dialogService.show(dialogConfig, {size: 'lg'}).result.then((res) => {
        }, (res) => {
            console.log(res);
        })
    };
    
    // 编辑filter的项
    editVFilter(o) {
        let self = this;
        let dialogConfig = {
            title: 'CONFIG.WIDGET.FILTER',
            contentComponent: VFilterComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                f_type: o.f_type || '>',
                f_top: o.f_top || '',
                f_values: o.f_values || []
            }
        }
        this.dialogService.show(dialogConfig , {size: 'lg'}).result.then((res: any) => {
            $.extend(o, res);
        }, (res: any) => {
            
        })
        // $uibModal.open({
        //     templateUrl: 'org/cboard/view/config/modal/vfilter.html',
        //     windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
        //     backdrop: false,
        //     size: 'lg',
        //     controller: function ($scope, $uibModalInstance) {
        //         this.type = ['=', '≠', '>', '<', '≥', '≤', '(a,b]', '[a,b)', '(a,b)', '[a,b]'];
        //         this.f_type = o.f_type ? o.f_type : '>';
        //         this.f_values = o.f_values ? o.f_values : [];
        //         this.f_top = o.f_top ? o.f_top : '';
        //         this.close = function () {
        //             $uibModalInstance.close();
        //         };
        //         this.ok = function () {
        //             o.f_type = this.f_type;
        //             o.f_values = this.f_values;
        //             o.f_top = this.f_top;
        //             $uibModalInstance.close();
        //         };
        //     }
        // });
    };
    
    // 过滤器选择数据格式整理
    schemaToSelect(schema) {
        if (schema.selects) {
            return _.clone(schema.selects);
        } else {
            var selects = [];
            selects = selects.concat(schema.measure);
            _.each(schema.dimension, function (e) {
                if (e.type == 'level') {
                    _.each(e.columns, function (c) {
                        selects.push(c);
                    });
                } else {
                    selects.push(e);
                }
            });
            return _.clone(selects);
        }
    };
    
    // 过滤器中的每一项的编辑
    editFilterGroup(col) {
        let self = this;
        var columnObjs = this.schemaToSelect(this.schema);
        let dialogConfig = {
            title: 'COMMON.FILTER_GROUP',
            contentComponent: FilterGroupComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                componentFactoryResolver: this.componentFactoryResolver,
                columnObjs: columnObjs,
                col: col,
                datasource: self.datasourceList,
                curWidget: self.curWidget
            }
        };
        this.dialogService.show(dialogConfig, {size: 'lg'}).result.then((data: any) => {
            if(col) {
                col.group = data.group;
                col.filters = data.filters;
            } else {
                self.curWidget.filterGroups.push(data);
            }
        }, (res) => {
            console.log(res);
        })
    };
    
    // 图表config的排序
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
    };
    
    // 行维的排序顺序
    cleanVSort() {
        _.each(this.curWidget.config.values, function (v) {
            _.each(v.cols, function (c) {
                c.sort = undefined;
            });
        });
    };
    
    // 行维|列表编辑-编辑排序
    editAlign(o) {
        switch (o.align) {
            case undefined:
                o.align = 'left';
                break;
            case 'left':
                o.align = 'right';
                break;
            default:
                o.align = undefined;
                break;
        }
    };
    
    // 将编辑的排序属性赋值给数据中
    cleanRowSort(o) {
        var sort = o.sort;
        _.each(this.curWidget.config.keys, function (k) {
            k.sort = undefined;
        });
        this.cleanVSort();
        o.sort = sort;
    };
    
    /** js tree related start... **/

    // 初始化默认打开树
    initializedTree() {
        this.tree.treeModel.expandAll();
    }
    // treeConfig;
    // jsTreeConfig1;
    // treeRelatedStart() {
    //     let self = this;
    //     this.treeConfig = this.jsTreeConfig1;
    
    //     $("#" + this.treeID).keyup(function (e) {
    //         if (e.keyCode == 46) {
    //             self.deleteNode();
    //         }
    //     });
    // }
    
    // 获取当前选中的数据
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
    
    // checkTreeNode(actionType) {
    //     return jstree_CheckTreeNode(actionType, treeID, this.dialogService.alert);
    // };
    
    // ignoreChanges;
    // switchNode(id) {
    //     this.ignoreChanges = false;
    //     var widgetTree = jstree_GetWholeTree(treeID);
    //     widgetTree.deselect_all();
    //     widgetTree.select_node(id);
    // };
    
    // applyModelChanges() {
    //     return !this.ignoreChanges;
    // };
    
    // 图表树-提示功能
    showInfo() {
        if (!this.treeService.checkTreeNode("info", this.tree)) return;
        var content = this.getSelectedWidget();
        this.dialogService.show(content,{windowClass:"modal-info",size: "lg"});
    };

    // 图表树-复制功能
    copyNode() {
        if (!this.treeService.checkTreeNode("copy", this.tree)) return;
        this.copyWgt(this.getSelectedWidget());
    };
    
    // 图表树-编辑功能
    editNode(node?: TreeNode) {
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
    
    // // 图表树-删除功能
    deleteNode() {
        // if (!this.checkTreeNode("delete")) return;
        // this.deleteWgt(this.getSelectedWidget());
        if (!this.treeService.checkTreeNode('delete', this.tree)) {
            return;
        }
        this.deleteWgt(this.getSelectedWidget());
    };

    // 搜索-用于默认搜索或者输入框的动态搜索
    keywords;
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

        console.log(list);
    
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

        // 异步更新树以及默认展开树
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
    
    // treeEventsObj = function () {
    //     var baseEventObj = jstree_baseTreeEventsObj({
    //         ngScope: $scope, ngHttp: $http, ngTimeout: $timeout, this.dialogService: this.dialogService,
    //         treeID: treeID, listName: "widgetList", updateUrl: updateUrl
    //     });
    //     return baseEventObj;
    // }();
    
    // 获取dashboard的配置数据集
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
    
    // 获取dashboard的配置数据集
    changeDs = function () {
        let self = this;
        this.curWidget.query = {};
        this.apiServer.get('config-params', {
            type: this.datasource.type,
            datasourceId: this.datasource.id,
            page: 'widget.html'
        },
        this.requestOptions
        ).subscribe(function (response) {
            // self.params = response.data;
            self.params = response;
            for (var i in self.params) {
                var name = self.params[i].name;
                var value = self.params[i].value;
                var checked = self.params[i].checked;
                var type = self.params[i].type;
                if (type == "checkbox" && checked == true) {
                    self.curWidget.query[name] = true;
                }
                if (type == "number" && value != "" && !isNaN(value)) {
                    self.curWidget.query[name] = Number(value);
                } else if (value != "") {
                    self.curWidget.query[name] = value;
                }
            }
            self.datasetFormGroup = self.formControlService.toFormGroup(response, self.curWidget.query);
        });
    };

    // 省市区的地址联动选择
    cities = [];
    setCities = function () {
        let self = this;
        this.cities = [];
        var province = _.find(this.provinces, function (e) {
            return e.code == self.curWidget.config.province.code;
        });
        if (province && province.cities) {
            self.cities = province.cities;
        } else if (self.curWidget.config.city && self.curWidget.config.city.code) {
            self.curWidget.config.city.code = "";
        }
    }
    /** js tree related End... **/
    
    // 拖动时的样式存储数据
    targetHighlight = {
        row: false, column: false, value: false, filter: false
    };
    
    // 拖动占位对上面的拖动样式进行编辑
    onDragstart (type) {
        switch (type) {
            case 'dimension':
                this.targetHighlight = {row: true, column: true, value: false, filter: true};
                break;
            case 'measure':
            case 'exp':
                this.targetHighlight = {row: false, column: false, value: true, filter: false};
                break;
            case 'filterGroup':
                this.targetHighlight.filter = true;
                break;
            case 'select':
                this.targetHighlight = {row: true, column: true, value: true, filter: true};
                break;
        }
    };
    
    // 拖动完成后的数据初始化
    onDragCancle() {
        setTimeout(this.targetHighlight = {
            row: false, column: false, value: false, filter: false
        }, 500);
    };
}