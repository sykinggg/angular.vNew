import { TranslateService } from '@ngx-translate/core';
export declare class ChartHeatMapTableService {
    private translateService;
    constructor(translateService: TranslateService);
    render(containerDom: any, option: any, scope: any, persist: any): (o: any) => void;
    parseOption(data: any): {
        tooltip: {
            trigger: string;
            axisPointer: {
                show: boolean;
                type: string;
            };
            formatter: (params: any) => string;
        };
        animation: boolean;
        toolbox: {
            show: boolean;
            feature: {
                mark: {
                    show: boolean;
                };
                dataView: {
                    show: boolean;
                    readOnly: boolean;
                };
                restore: {
                    show: boolean;
                };
                saveAsImage: {
                    show: boolean;
                };
            };
        };
        xAxis: {
            name: string;
            type: string;
            data: any;
            splitArea: {
                show: boolean;
            };
        };
        yAxis: {
            name: string;
            type: string;
            data: any;
            splitArea: {
                show: boolean;
            };
        };
        dataZoom: {
            type: string;
            show: boolean;
            xAxisIndex: number[];
            start: number;
            end: number;
        }[];
        visualMap: {
            min: number;
            max: number;
            calculable: boolean;
            orient: string;
            left: string;
            bottom: string;
            inRange: {
                color: any[];
            };
        };
        series: {
            type: string;
            data: any[];
        }[];
    };
}
