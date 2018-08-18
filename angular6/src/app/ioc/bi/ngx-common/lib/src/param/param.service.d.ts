import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ApiServer } from 'core-services/core';
export declare class ParamService {
    private route;
    private datePipe;
    private translateService;
    private dataServer;
    initParamsSubject: Subject<any>;
    quantity: number;
    constructor(route: ActivatedRoute, datePipe: DatePipe, translateService: TranslateService, dataServer: ApiServer);
    initParam(param: any, rows: any): void;
    getParamTitle(param: any): string;
}
