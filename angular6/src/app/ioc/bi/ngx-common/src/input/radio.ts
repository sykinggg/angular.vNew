import { Input } from './input';

export class Radio extends Input<string> {
    controlType = 'radio';
    checked = false;

    constructor(options: {} = {}) {
        super(options);
        this.checked = options.checked;
    }
}