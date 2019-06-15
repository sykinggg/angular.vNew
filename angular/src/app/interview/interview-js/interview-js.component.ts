import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-interview-js',
    templateUrl: './interview-js.component.html',
    styleUrls: ['./interview-js.component.scss']
})
export class InterviewJsComponent implements OnInit {

    public code = {
        new: this.sanitizer.bypassSecurityTrustHtml(`
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj); 
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
