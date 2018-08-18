import { Input } from './input';

export class Checkbox extends Input<string> {
    controlType = 'radio';
    checked = false;

    constructor(options: {} = {}) {
        super(options);
        this.checked = options.checked;
    }
}