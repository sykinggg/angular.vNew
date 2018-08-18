import { CBoardTableRenderService } from './render/tableRender.service';
import { ChartDataProcessService } from './common/chartDataProcess.service';
export declare class ChartTableService {
    private cBoardTableRender;
    private chartDataProcess;
    constructor(cBoardTableRender: CBoardTableRenderService, chartDataProcess: ChartDataProcessService);
    render(containerDom: any, option: any, persist: any, drill: any): (o: any, drillConfig: any) => void;
    parseOption(data: any): {
        chartConfig: any;
        data: any;
    };
}
