import { Input } from './input';

export class Select extends Input<string> {
    controlType = 'select';
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}