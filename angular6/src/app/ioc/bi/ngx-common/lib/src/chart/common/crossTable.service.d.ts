import { TranslateService } from '@ngx-translate/core';
export declare class CrossTableService {
    private translateService;
    constructor(translateService: TranslateService);
    isRender: any;
    container: any;
    table(args: any): void;
    bandDrillEvent(t_class: any, drill: any, render: any): void;
    paginationProcessData(rawData: any, headerLines: any, pageSize: any): any[];
    render(data: any, chartConfig: any, drill: any): string;
    selectDataNum(data: any, num: any, chartConfig: any, drill: any, random: any, t_class: any, render: any): void;
    clickPageNum(data: any, chartConfig: any, drill: any, random: any): void;
    renderPagination(pageCount: any, pageNumber: any, pageObj: any, target: any): string;
    buttonColor(pageNum: any, target: any): void;
    clickNextPrev(pageCount: any, pageObj: any, random: any): void;
    export(random: any, data: any): void;
}
