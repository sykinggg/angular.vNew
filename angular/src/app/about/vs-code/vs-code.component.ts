import { Component, OnInit, ViewChild } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
    selector: 'app-vs-code',
    templateUrl: './vs-code.component.html',
    styleUrls: ['./vs-code.component.scss']
})
export class VsCodeComponent implements OnInit {

    editorOptions = {
        theme: 'vs-dark',
        language: 'javascript'
    };
    code: string;

    constructor() {
        this.code = 'function x() {\nconsole.log("Hello world!");\n}';
    }

    ngOnInit(): void {
    }

    public getCode() {
        console.log(this.code);
    }

}
