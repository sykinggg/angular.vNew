import { Abstract } from '@ts-ioc/core';
import { IWidget } from 'bi/widgets';


export interface IBoradtemp {
    widgets: IWidget[]
    export();
    refresh();
}

export enum BoradtempType {
    TimeLine= 'TimeLine'
}

@Abstract()
export abstract class Boradtemp implements IBoradtemp {

    widgets: IWidget[];
    constructor() {
        this.widgets = [];
    }

    abstract export();
    abstract refresh();
}

