import {DynamicBase} from "./dynamic-base";

export class Dropdown extends DynamicBase<string> {
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];
    
    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
