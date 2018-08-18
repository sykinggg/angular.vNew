import { Widget, WidgetType, IWidget } from './Widget';
import { DIModule } from '@ts-ioc/bootstrap';
import * as renderWidget from './renderWidget';

@DIModule({
    provide: WidgetType.tableType,
    imports: [
        renderWidget
    ],
    providers: [

    ]
})

export class ConfigWidget extends Widget {
    constructor() {
        super();
    }

    export() {
        throw new Error("Method not implemented.");
    }
}