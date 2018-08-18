import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Input } from './input';

@Injectable()

export class FormControlService {
    constructor() {}

    toFormGroup(inputs: Input<any>[], params: any) {
        let group: any = {};
        let labelPattern = new RegExp('.*\'([\\w\\.]+)\'.*');

        inputs.forEach((item: any) => {
            if (item.type === 'checkbox' && item.checked === true) {
                params[item.name] = true;
            } if (item.type === 'number' && item.value !== '' && !isNaN(item.value)) {
                params[item.name] = Number(item.value);
            } else if (item.value !== '') {
                params[item.name] = item.value;
            } else {
                item.value = params[item.name];
            }
            item.label = item.label.replace(labelPattern, '$1')
            group[item.name] = item.required ? new FormControl(item.value || '', Validators.required) : new FormControl(item.value || '');
        });

        return new FormGroup(group);
    }
}
