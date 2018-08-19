import { Abstract } from '@ts-ioc/core';
import { IdataSet } from 'bi/dataSet';

export interface IWidget {
    dataSet: IdataSet[],
    export()
}

export enum WidgetType {
    tableType= 'tableWidget',
    chartType= 'chartType',
    valueType= 'valueType',
    configType= 'configType'
}

@Abstract()
export abstract class Widget implements IWidget {
    dataSet: IdataSet[];
    constructor() {
        this.dataSet = [];
    }
    export() {}
}
