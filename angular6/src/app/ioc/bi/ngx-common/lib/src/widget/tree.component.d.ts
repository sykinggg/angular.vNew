import { OnInit } from '@angular/core';
import { TreeComponent, TreeNode } from 'angular-tree-component';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeConfigService } from 'app/shared/tree/tree-config.service';
import { Observable } from 'rxjs/Observable';
import { ApiServer, DialogService } from 'core-services/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'app/shared/data/data.service';
import { UpdateService } from 'app/shared/data/update.service';
import { FormGroup } from '@angular/forms';
export declare class WidgetTreeComponent implements OnInit {
    private treeService;
    private router;
    private activeRouter;
    private apiServer;
    private translate;
    private dialogService;
    private dataService;
    private updateService;
    private requestOptions;
    constructor(treeService: TreeConfigService, router: Router, activeRouter: ActivatedRoute, apiServer: ApiServer, translate: TranslateService, dialogService: DialogService, dataService: DataService, updateService: UpdateService);
    tree: TreeComponent;
    treeOptions: any;
    searchObservable: Observable<any>;
    customDs: boolean;
    initializedTree(): void;
    editNode(node?: TreeNode): void;
    doConfigParams: () => void;
    editWgt(widget: any): void;
    viewQueryMoal: any;
    cleanPreview(): void;
    datasourceList: any;
    curWidget: any;
    widgetType: any;
    doEditWgt(widget: any): void;
    widgetList: any;
    getWidgetList(callback?: any): void;
    keywords: any;
    originalData: any[];
    searchNode(): void;
    loadDatasource(): void;
    datasetFormGroup: FormGroup;
    toChartDisabled: boolean;
    filterSelect: {};
    loadData(): void;
    dataset: any;
    datasetList: any;
    schema: any;
    alerts: any;
    loading: boolean;
    datasource: any;
    loadFromCache: boolean;
    buildSchema(): void;
    switchLiteMode: (mode: any) => void;
    loadDsFilterGroups(): void;
    loadDsExpressions(): void;
    loadDataset(callback?: any): void;
    columns: any;
    newConfig(): void;
    disKeysGroups: any[];
    addWatch(): void;
    changeChartStatus(): void;
    /***************************************
     *  0:  None items
     *  1:  only 1 item
     * -1:  None Restrict
     *  2:  1 or more
     ***************************************/
    configRule: {
        line: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        pie: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        kpi: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        table: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        funnel: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        sankey: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        radar: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        map: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        scatter: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        gauge: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        wordCloud: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        treeMap: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        areaMap: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        heatMapCalendar: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        heatMapTable: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        liquidFill: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        contrast: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        chinaMap: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        chinaMapBmap: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
        relation: {
            keys: number;
            groups: number;
            filters: number;
            values: number;
        };
    };
    chart_types_status: {
        "line": boolean;
        "pie": boolean;
        "kpi": boolean;
        "table": boolean;
        "funnel": boolean;
        "sankey": boolean;
        "radar": boolean;
        "map": boolean;
        "scatter": boolean;
        "gauge": boolean;
        "wordCloud": boolean;
        "treeMap": boolean;
        "heatMapCalendar": boolean;
        "heatMapTable": boolean;
        "liquidFill": boolean;
        "areaMap": boolean;
        "contrast": boolean;
        "chinaMap": boolean;
        "chinaMapBmap": boolean;
        "relation": boolean;
    };
    addHelpMessage(): void;
    helpMessage: {
        row: string;
        column: string;
        filter: string;
        value: string;
    };
    addValidateWatch(): void;
    widgetName: any;
    widgetCategory: any;
    widgetId: any;
    optFlag: any;
    liteMode: any;
    newWgt(curWidget: any): void;
    categoryList: any;
    getCategoryList(): void;
    getSelectedWidget(node?: TreeNode): any;
    deleteNode(): void;
    deleteWgt(widget: any): void;
    ngOnInit(): void;
}
