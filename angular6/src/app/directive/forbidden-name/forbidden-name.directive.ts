import { Directive, Input } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Directive({
    selector: '[appForbiddenName]',
    // providers: [{provide: 'NG_VALIDATORS', useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenNameDirective {
    
    constructor() { }

    // @Input('appForbiddenName') forbiddenName: string;
    //
    // validate(control: AbstractControl): {[key: string]: any} {
    //     return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
    //                             : null;
    // }

}
