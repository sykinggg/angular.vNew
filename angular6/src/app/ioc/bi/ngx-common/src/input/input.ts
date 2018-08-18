export class Input<T> {
    name: string;
    label: string;
    type: string;
    value: T;
    required: boolean;
    order: number;

    constructor(options: {
        name?: string,
        label?: string,
        type?: string,
        value?: T,
        required?: boolean,
        order?: number
    } = {}) {
        this.name = options.name || '';
        this.label = options.label || '';
        this.type = options.type || '';
        this.value = options.value;
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
    }
}
