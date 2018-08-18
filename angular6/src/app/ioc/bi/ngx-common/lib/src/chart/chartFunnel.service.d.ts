import { ActivatedRoute } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
export declare class ChartFunnelService {
    private activeRoute;
    private updateEchartOptions;
    constructor(activeRoute: ActivatedRoute, updateEchartOptions: UpdateEchartOptionsService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): any;
    parseOption(data: any): {
        title: any[];
        legend: {
            data: any[];
        };
        tooltip: {
            trigger: string;
            formatter: (params: any) => string;
        };
        toolbox: boolean;
        series: any[];
    };
}
