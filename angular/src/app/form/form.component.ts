import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    routerLinkArr: Array<any> = [
        { routerName: 'userInput', routerLink: 'userInput' },
        { routerName: 'templateForm', routerLink: 'templateForm' },
        { routerName: 'formValidate', routerLink: 'formValidate' },
        { routerName: 'formResponse', routerLink: 'formResponse' },
        { routerName: 'dynamicForm', routerLink: 'dynamicForm' }
    ];

    constructor() { }

    ngOnInit() {
    }

}
