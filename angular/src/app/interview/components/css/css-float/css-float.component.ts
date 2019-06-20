import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-css-float',
    templateUrl: './css-float.component.html',
    styleUrls: ['./css-float.component.scss']
})
export class CssFloatComponent implements OnInit {

    public code = {
        floatFix1: this.sanitizer.bypassSecurityTrustHtml(`
.clearfix:after{content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.clearfix{display: inline-block;} /* for IE/Mac */
        `),
        floatFix2: this.sanitizer.bypassSecurityTrustHtml(`
#parent:after{
    content:".";
    height:0;
    visibility:hidden;
    display:block;
    clear:both;
}
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
