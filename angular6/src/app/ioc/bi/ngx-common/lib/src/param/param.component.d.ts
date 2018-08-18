import { OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AfterDialogInit, DialogService, DialogResult } from 'core-services/core';
export declare class ParamComponent implements OnInit, AfterDialogInit {
    private translateService;
    private dialogService;
    alerts: Array<any>;
    paramTypes: Array<any>;
    param: any;
    status: any;
    boardDataset: any;
    constructor(translateService: TranslateService, dialogService: DialogService);
    ngOnInit(): void;
    afterDialogInit(dialog: DialogResult, modalContent: any): void;
    closeAlert(alert: any): void;
    add(selectedDataset: any, column: any): void;
    deleteColumn(index: any): void;
    isSelected(column: string, dataset: string): any;
}
