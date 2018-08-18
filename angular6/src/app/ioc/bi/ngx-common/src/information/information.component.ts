import { Component } from '@angular/core';
import { AfterDialogInit, DialogResult } from 'core-services/core';

@Component({
    selector: '[sk-bi-information]',
    template: require('./information.component.html!text')
})

export class InformationComponent implements AfterDialogInit {
    content: any;

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        this.content = dialog.data;
    }
}