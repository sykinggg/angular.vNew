import { Component } from '@angular/core';
import { AfterDialogInit, DialogResult } from 'core-services/core/lib';

@Component({
    template: require('./vFilter.component.html!text')
})

export class VFilterComponent implements AfterDialogInit {
    

    type = ['=', '≠', '>', '<', '≥', '≤', '(a,b]', '[a,b)', '(a,b)', '[a,b]'];
    f_type;
    f_top;
    f_values;

    constructor() {}

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        let self = this;
        let oldClose = dialog.modal.close;

        this.f_top = dialog.data.f_top;
        this.f_type = dialog.data.f_type;
        this.f_values = dialog.data.f_values;


        dialog.modal.close = () => {
            let data = {
                f_top: self.f_top,
                f_type: self.f_type,
                f_values: self.f_values
            }
            oldClose(data);
        }
    }   
}