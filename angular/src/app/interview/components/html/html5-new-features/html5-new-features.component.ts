import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-html5-new-features',
    templateUrl: './html5-new-features.component.html',
    styleUrls: ['./html5-new-features.component.scss']
})
export class Html5NewFeaturesComponent implements OnInit {

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
