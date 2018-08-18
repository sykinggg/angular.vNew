import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Input as AdminInput } from './input';

@Component({
    selector: '[sk-bi-input]',
    template: require('./input.component.html!text')
})

export class InputComponent {
    @Input() input: AdminInput<any>;
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.input.name].valid;
    }
}