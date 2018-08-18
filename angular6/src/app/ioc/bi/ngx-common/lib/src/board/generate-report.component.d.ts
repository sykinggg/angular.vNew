import { Router } from '@angular/router';
import { ApiServer, AfterDialogInit, DialogResult } from 'core-services/core';
import { DataService } from '../data/data.service';
import { ParamService } from '../param/param.service';
import { MenuService } from '../menu/menu.service';
export declare class GenerateReportComponent implements AfterDialogInit {
    private router;
    private dataServer;
    private menuService;
    private dataService;
    private paramService;
    board: any;
    formData: {
        reportName: string;
        statType: string;
        email: string;
        recipients: any[];
    };
    constructor(router: Router, dataServer: ApiServer, menuService: MenuService, dataService: DataService, paramService: ParamService);
    afterDialogInit(dialog: DialogResult, modalContent: any): void;
    addEmail(input: any): void;
    getParamTitle(param: any): string;
}
