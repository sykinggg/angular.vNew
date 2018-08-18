import { Component } from '@angular/core';

import { AfterDialogInit, DialogResult } from 'core-services/core';

@Component({
    template: require('./param-selector.component.html!text')
})

export class ParamSelectorComponent implements AfterDialogInit {
    private fetchSelects: any;

    types = ['=', '≠', '>', '<', '≥', '≤', '(a,b]', '[a,b)', '(a,b)', '[a,b]'];
    Keyword = '';
    selects = [];
    selectItems = [];
    param: any;
    filter: boolean;
    operate: any = {};
    byFilter = {
        a: false
    };
    loadSelect = true;
    loading = false;

    constructor() {}

    private showValues() {
        let owner = this;
        let equal = ['=', '≠'];
        let openInterval = ['>', '<', '≥', '≤'];
        let closeInterval = ['(a,b]', '[a,b)', '(a,b)', '[a,b]'];

        this.operate.equal = equal.some((item: any) => {
            return item === owner.param.type;
        });
        this.operate.openInterval = openInterval.some((item: any) => {
            return item === owner.param.type;
        });
        this.operate.closeInterval = closeInterval.some((item: any) => {
            return item === owner.param.type;
        });
    }

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        this.filter = dialog.data.filter;
        this.param = dialog.data.param;
        if (this.param.values.length === 0) {
            this.param.values.length = 1;
        }
        this.fetchSelects = dialog.data.getSelects;
        this.showValues();
    }

    dbclickPush(o) {
        if (this.operate.equal) {
            if (this.param.values.length === 1 && (!this.param.values[0] || this.param.values[0] === '')) {
                this.param.values.length = 0;
            }
            this.param.values.push(o);
        }
        if (this.operate.openInterval) {
            this.param.values[0] = o;
        }
        if (this.operate.closeInterval) {
            if (this.param.values[0] === undefined || this.param.values[0] === '') {
                this.param.values[0] = o;
            } else {
                this.param.values[1] = o;
            }
        }
    }

    deleteValues(array) {
        if (this.operate.equal) {
            this.param.values = this.param.values.filter((item: any) => {
                return array.indexOf(item) < 0;
            });
        }
    }

    pushValues() {
        if (this.param.values.length === 1 && (!this.param.values[0] || this.param.values[0] === '')) {
            this.param.values.length = 0;
        }
        if (this.operate.openInterval) {
            this.selectItems.splice(1, this.selectItems.length - 1);
        }
        if (this.operate.closeInterval) {
            this.selectItems.splice(2, this.selectItems.length - 2);
        }
        this.param.values = this.param.values.concat(this.selectItems);
        this.selectItems = [];
    }

    filterType() {
        this.param.values = [];
        this.param.values.length = 1;
        this.showValues();
    }

    getSelects() {
        let owner = this;

        this.loading = true;
        this.fetchSelects(this.byFilter.a, this.param.col, function (d) {
            owner.selects = d;
            owner.loading = false;
        });
    }

    getFilteredOptions(): Array<any> {
        let owner = this;

        return this.selects.filter((item: any) => {
            return owner.param.values.indexOf(item) < 0 && item.indexOf(owner.Keyword) > -1;
        });
    }
}