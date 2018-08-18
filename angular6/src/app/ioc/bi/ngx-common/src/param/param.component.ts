import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AfterDialogInit, DialogService, DialogResult } from 'core-services/core';

@Component({
    template: require('./param.component.html!text')
})

export class ParamComponent implements OnInit, AfterDialogInit {
    alerts: Array<any>;
    paramTypes: Array<any>;
    param: any;
    status: any;
    boardDataset: any;

    constructor(
        private translateService: TranslateService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.paramTypes = [{
            name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_PICKER'),
            value: 'picker'
        }, {
            name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_SLIDER'),
            value: 'slider'
        }, {
            name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_DATE_RANGE'),
            value: 'date_range'
        }, {
            name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_SELECTOR'),
            value: 'selector'
        }];
    }

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        let owner = this;
        let oldClose = dialog.modal.close;

        dialog.modal.close = () => {
            if (this.param.name) {
                oldClose(true);
            } else {
                owner.dialogService.alert(this.translateService.instant('CONFIG.DASHBOARD.ENTER_PARAMETER_NAME'), 'COMMON.TIP', 0);
            }
        };

        this.param = dialog.data.param;
        this.status = dialog.data.status;
        this.boardDataset = dialog.data.boardDataset;
        if (!this.param.paramType) {
            this.param.paramType = 'picker';
        }
        if (!this.param.cfg) {
            this.param.cfg = {};
        }
    }

    closeAlert(alert: any) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }

    add(selectedDataset, column) {
        let v = {...selectedDataset};
        let paramCol = this.param.col;
        let haveCol = null;

        delete v.columns;
        v.column = column;
        for (let i = 0; i < paramCol.length; i++) {
            (paramCol[i].column === v.column && paramCol[i].name === v.name) ? haveCol = true : null;
        }
        (!haveCol || this.param.col === []) ? this.param.col.push(v) : null;
    }

    deleteColumn(index) {
        this.param.col.splice(index, 1);
    }

    isSelected(column: string, dataset: string) {
        return this.param.col.some((item) => {
            return item.name === dataset && item.column === column;
        });
    }
}