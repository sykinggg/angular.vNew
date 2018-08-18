import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
export declare class BoardService {
    private route;
    applyParamsSubject: Subject<any>;
    datasetFilters: any;
    widgetFilters: any;
    relationFilters: any;
    board: any;
    relations: Array<any>;
    constructor(route: ActivatedRoute);
    beforeFilter(): void;
    paramToFilter(params: Array<any>): void;
    injectFilter(widget: any): any;
    initDsReloadStatus(reload: boolean): any;
}
