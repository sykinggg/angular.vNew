import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ApiServer, AfterDialogInit, DialogResult } from 'core-services/core';
import { REQUEST_OPTIONS } from '../request-options';
import { FilterData } from '../data/data-type';
import { DataService } from '../data/data.service';
import { ParamService } from '../param/param.service';
import { MenuService } from '../menu/menu.service';

@Component({
    template: require('./generate-report.component.html!text')
})

export class GenerateReportComponent implements AfterDialogInit {
    board: any;
    formData = {
        reportName: '',
        statType: '2',
        email: '',
        recipients: []
    };

    constructor(
        private router: Router,
        private dataServer: ApiServer,
        private menuService: MenuService,
        private dataService: DataService,
        private paramService: ParamService
    ) {}

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        let oldClose = dialog.modal.close;

        this.board = dialog.data;
        this.formData.reportName = this.board.reportName;
        this.formData.statType = this.board.statType || '2';
        this.formData.recipients = this.board.recipients ? this.board.recipients.split(',') : [];
        dialog.modal.close = () => {
            if (this.formData.reportName.trim()) {
                this.dataServer.post(this.board.reportId ? 'edit-report' : 'add-report', {
                    config: JSON.stringify({
                        ...this.formData,
                        recipients: this.formData.recipients.join(','),
                        boardId: this.board.id,
                        reportId: this.board.reportId,
                        boardFilterParam: this.board.layout.rows[0].params.map((item) => {
                            return new FilterData(item.col[0].column, item.type, item.values, null, this.paramService.getParamTitle(item));
                        }),
                        exportConfig: this.dataService.getConfigs(this.board)
                    })
                }, REQUEST_OPTIONS).subscribe((data: any) => {
                    let id = data.id || this.board.reportId;
                    let navigationExtras: NavigationExtras = {
                        queryParams: {
                            id: id,
                            dateType: this.formData.statType
                        }
                    };

                    this.board.reportName = this.formData.reportName;
                    this.dataServer.request('reports', null, REQUEST_OPTIONS).subscribe((data: any) => {
                        this.menuService.reportsSubject.next(data);
                        oldClose(true);
                        this.router.navigate(['/admin/report', id], navigationExtras);
                    });
                });
            }
        };
    }

    addEmail(input: any) {
        if (!input.invalid) {
            this.formData.recipients.unshift(input.value);
            this.formData.email = '';
        }
    }

    getParamTitle(param: any): string {
        return this.paramService.getParamTitle(param);
    }
}
