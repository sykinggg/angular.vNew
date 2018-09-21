import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-input',
    templateUrl: './user-input.component.html',
    styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {

    values: String = '';

    onKey(event: any) {
        this.values += event.target.value + '|';
    }
    downKey(event: any) {
        this.values += event.key + '|';
    }
    clear() {
        this.values = '';
    }
    onKeyTemplate(event) {
        console.log(event);
    }
    box2Value: String = '';
    box3Value: String = '';
    keyUpEnter(value, type) {
        this[type] = value;
    }
    constructor() { }

    ngOnInit() {
    }

}
