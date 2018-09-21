import { Component, OnInit } from '@angular/core';
import { formData } from './data';

@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];

    model = new formData(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

    submitted = false;

    onSubmit() { this.submitted = true; }
    get diagnostic() { return JSON.stringify(this.model); }

    clear() {
        this.model = new formData(18, '', '');
    }
    constructor() { }

    ngOnInit() {
    }

}
