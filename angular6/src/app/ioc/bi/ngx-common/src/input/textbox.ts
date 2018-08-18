import { Input } from './Input';

export class TextboxQuestion extends Input<string> {
    controlType = 'text';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}