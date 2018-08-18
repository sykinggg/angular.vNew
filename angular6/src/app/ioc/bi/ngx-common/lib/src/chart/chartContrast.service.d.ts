import { ActivatedRoute } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
export declare class ChartContrastService {
    private activatedRoute;
    private updateEchartOptionsService;
    constructor(activatedRoute: ActivatedRoute, updateEchartOptionsService: UpdateEchartOptionsService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): (o: any) => void;
    parseOption(data: any): {
        tooltip: {
            formatter: (params: any) => string;
        };
        legend: {
            data: any[];
        };
        grid: {
            left: string;
            right: string;
            bottom: string;
            containLabel: boolean;
        };
        xAxis: {
            type: string;
            min: number;
            max: any;
        }[] | {
            type: string;
            axisTick: {
                show: boolean;
            };
            data: any[];
        }[];
        yAxis: {
            type: string;
            min: number;
            max: any;
        }[] | {
            type: string;
            axisTick: {
                show: boolean;
            };
            data: any[];
        }[];
        series: {
            name: any;
            type: string;
            stack: string;
            barWidth: number;
            label: {
                normal: {
                    show: boolean;
                };
            };
            itemStyle: {
                normal: {
                    color: string;
                };
            };
            data: any;
        }[];
    };
}
