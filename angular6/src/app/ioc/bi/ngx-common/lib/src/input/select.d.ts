import { Input } from './input';
export declare class Select extends Input<string> {
    controlType: string;
    options: {
        key: string;
        value: string;
    }[];
    constructor(options?: {});
}
