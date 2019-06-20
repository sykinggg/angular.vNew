import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-interview-html',
    templateUrl: './interview-html.component.html',
    styleUrls: ['./interview-html.component.scss']
})
export class InterviewHtmlComponent implements OnInit {

    public code = {
        h5New: this.sanitizer.bypassSecurityTrustHtml(`
<!---[if lt IE 9]> 
<script> src="http://html5shiv.googlecode.com/svn/trunk/html5.js"</script> 
<![endif]---> 
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
