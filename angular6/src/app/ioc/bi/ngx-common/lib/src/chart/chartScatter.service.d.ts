import { ActivatedRoute } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
export declare class ChartScatterService {
    private activatedRoute;
    private updateEchartOptions;
    constructor(activatedRoute: ActivatedRoute, updateEchartOptions: UpdateEchartOptionsService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): (o: any) => void;
    parseOption(data: any): {
        legend: {
            data: any[];
        };
        tooltip: {
            trigger: string;
            formatter: (params: any) => string;
        };
        xAxis: {
            data: any[];
            splitLine: {
                lineStyle: {
                    type: string;
                };
            };
            axisLabel: {
                interval: any;
                rotate: any;
            };
        };
        yAxis: {
            axisLabel: {
                formatter: (value: any) => any;
            };
            splitLine: {
                lineStyle: {
                    type: string;
                };
            };
            scale: boolean;
        };
        visualMap: ({
            dimension: number;
            show: boolean;
            min: number;
            max: number;
            calculable: boolean;
            precision: number;
            textStyle: {
                color: string;
            };
            inRange: {
                symbolSize: number[];
                opacity?: undefined;
            };
        } | {
            dimension: number;
            show: boolean;
            min: any;
            max: any;
            inRange: {
                opacity: number[];
                symbolSize?: undefined;
            };
            calculable?: undefined;
            precision?: undefined;
            textStyle?: undefined;
        })[];
        series: {
            name: any;
            data: {
                name: any;
                value: any;
            }[];
            type: string;
        }[];
    };
}
