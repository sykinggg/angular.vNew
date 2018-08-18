import { CrossTableService } from '../common/crossTable.service';
export declare class CBoardTableRenderService {
    private crossTableService;
    constructor(crossTableService: CrossTableService);
    container: any;
    options: any;
    tall: any;
    drill: any;
    CBoardTableRender(jqContainer: any, options: any, drill: any): this;
    resize(container: any): void;
    do(tall: any, persist?: any): (o: any, drillConfig: any) => void;
}
