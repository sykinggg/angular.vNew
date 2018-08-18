import { Widget, WidgetType, IWidget } from '../Widget';
import { DIModule } from '@ts-ioc/bootstrap';
import * as temp from '../temps';

// @DIModule({
//     provide: WidgetType.tableType,
//     imports: [
//         temp
//     ],
//     providers: [

//     ]
// })

export interface IConfigWidget extends IWidget {
    
}

export class ConfigWidget extends Widget {
    constructor() {
        super();
    }

    export() {
        throw new Error("Method not implemented.");
    }
}