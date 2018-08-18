import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServer } from 'core-services/core';
import { UpdateService } from './update.service';
export declare class DataService {
    private route;
    private dataServer;
    private updateService;
    private datasetList;
    apis: any;
    constructor(route: ActivatedRoute, dataServer: ApiServer, updateService: UpdateService);
    getDatasetList(refresh?: boolean): Observable<any>;
    linkDataset(datasetId: any, chartConfig: any): Observable<any>;
    private getDimensionConfig;
    getDimensionValues(datasource: any, query: any, datasetId: any, colmunName: any, chartConfig: any, callback: any): void;
    getConfiguration(chartConfig: any): {
        rows: any[];
        columns: any[];
        filters: any[];
        values: any[];
    };
    getDataSeries(datasource: any, query: any, datasetId: any, chartConfig: any, callback: any, reload: any): void;
    getDrillPath(datasetId: any, id: any): Observable<any>;
    getDrillConfig(datasetId: any, chartConfig: any): Observable<any>;
    viewQuery(params: any, callback: any): void;
    getColumns(option: any): void;
    private getDataSeriesViaConfig;
    private configToDataSeries;
    private getExpSeries;
    private filter;
    toNumber(...args: Array<any>): any;
    /**
     * Cast the aggregated raw data into data series
     * @param rawData
     * @param chartConfig
     */
    castRawData2Series(aggData: any, chartConfig: any): {
        keys: any[];
        series: any[];
        data: any[];
        seriesConfig: {};
    };
    getDateString(date: any): string;
    getConfigs(board: any): any[];
    parserExp(rawExp: any): {
        evalExp: any;
        aggs: any[];
        names: any[];
    };
    private castSeriesData;
    private compileExp;
    private aggregate;
    private aggregate_sum;
    private aggregate_count;
    private aggregate_avg;
    private getHeaderIndex;
    private getRowElements;
}
