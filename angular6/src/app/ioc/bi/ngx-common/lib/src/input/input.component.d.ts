import { FormGroup } from '@angular/forms';
import { Input as AdminInput } from './input';
export declare class InputComponent {
    input: AdminInput<any>;
    form: FormGroup;
    readonly isValid: boolean;
}
