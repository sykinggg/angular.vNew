import { FormGroup } from '@angular/forms';
import { Input } from './input';
export declare class FormControlService {
    constructor();
    toFormGroup(inputs: Input<any>[], params: any): FormGroup;
}
