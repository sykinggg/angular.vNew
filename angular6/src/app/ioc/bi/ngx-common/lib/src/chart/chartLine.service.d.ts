import { Router } from '@angular/router';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
export declare class ChartLineService {
    private router;
    private updateEchartOptions;
    constructor(router: Router, updateEchartOptions: UpdateEchartOptionsService);
    render(containerDom: any, option: any, persist: any, drill: any, relations?: any, chartConfig?: any): any;
    parseOption(data: any): any;
}
