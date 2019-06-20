import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-interview-css',
    templateUrl: './interview-css.component.html',
    styleUrls: ['./interview-css.component.scss']
})
export class InterviewCssComponent implements OnInit {

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
