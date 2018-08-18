import { TranslateService } from '@ngx-translate/core';
import { CBoardKpiRenderService } from './render/kpiRender.service';
export declare class ChartKpiService {
    private translate;
    private cBoardKpiRender;
    constructor(translate: TranslateService, cBoardKpiRender: CBoardKpiRenderService);
    render(containerDom: any, option: any, scope: any, persist: any): any;
    parseOption(data: any): any;
}
