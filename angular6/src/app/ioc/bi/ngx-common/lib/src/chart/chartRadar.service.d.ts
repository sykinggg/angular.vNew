import { ActivatedRoute } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
export declare class ChartRadarService {
    private activatedRoute;
    private updateEchartOptions;
    constructor(activatedRoute: ActivatedRoute, updateEchartOptions: UpdateEchartOptionsService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): any;
    parseOption(_data: any): {
        tooltip: {
            trigger: string;
        };
        toolbox: boolean;
        legend: {
            orient: string;
            left: string;
            data: any[];
        };
        radar: {
            indicator: any[];
        };
        series: {
            name: string;
            type: string;
            itemStyle: {
                emphasis: {
                    areaStyle: {
                        color: string;
                    };
                };
            };
            data: any[];
        }[];
    };
}
