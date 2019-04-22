import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { JsTemplateSumDirective } from './js-template-sum.directive';

@Component({
    selector: 'app-js-template-sum',
    templateUrl: './js-template-sum.component.html',
    styleUrls: ['./js-template-sum.component.scss']
})
export class JsTemplateSumComponent implements OnInit {

    public tpl: any = {};

    @Input()
    title: string;

    public content: JsTemplateSumDirective | null;
    @ContentChildren(JsTemplateSumDirective, {descendants: false}) contents: QueryList<JsTemplateSumDirective>;

    public switch(type: string) {
        this[type] = !this[type];
    }

    constructor() { }

    ngOnInit() {
    }

    ngAfterContentChecked() {
        this.tpl.content = this.contents.first;
    }

}
