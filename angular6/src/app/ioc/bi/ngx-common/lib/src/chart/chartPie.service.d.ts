import { Router } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
export declare class ChartPieService {
    private router;
    private updateEchartOptions;
    constructor(router: Router, updateEchartOptions: UpdateEchartOptionsService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): any;
    parseOption(data: any): {
        title: any[];
        legend: {
            orient: string;
            left: string;
            data: any[];
        };
        tooltip: {
            trigger: string;
            formatter: string;
        };
        toolbox: boolean;
        series: any[];
    };
}
