import { AfterDialogInit, DialogResult } from 'core-services/core';
export declare class ParamSelectorComponent implements AfterDialogInit {
    private fetchSelects;
    types: string[];
    Keyword: string;
    selects: any[];
    selectItems: any[];
    param: any;
    filter: boolean;
    operate: any;
    byFilter: {
        a: boolean;
    };
    loadSelect: boolean;
    loading: boolean;
    constructor();
    private showValues;
    afterDialogInit(dialog: DialogResult, modalContent: any): void;
    dbclickPush(o: any): void;
    deleteValues(array: any): void;
    pushValues(): void;
    filterType(): void;
    getSelects(): void;
    getFilteredOptions(): Array<any>;
}
