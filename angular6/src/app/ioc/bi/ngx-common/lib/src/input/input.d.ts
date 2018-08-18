export declare class Input<T> {
    name: string;
    label: string;
    type: string;
    value: T;
    required: boolean;
    order: number;
    constructor(options?: {
        name?: string;
        label?: string;
        type?: string;
        value?: T;
        required?: boolean;
        order?: number;
    });
}
