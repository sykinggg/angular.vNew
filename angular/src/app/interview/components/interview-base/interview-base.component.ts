import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-interview-base',
    templateUrl: './interview-base.component.html',
    styleUrls: ['./interview-base.component.scss']
})
export class InterviewBaseComponent implements OnInit {

    public code = {
        cssJs: this.sanitizer.bypassSecurityTrustHtml(`
<script>
    var script=document.createElement("script");
    script.type="text/javascript";
    script.src="file.js";
    document.getElementsByTagName("head")[0].appendChild(script);
</script>
        `),
        ua: this.sanitizer.bypassSecurityTrustHtml(`
function whatBrowser() {  
    document.Browser.Name.value=navigator.appName;  
    document.Browser.Version.value=navigator.appVersion;  
    document.Browser.Code.value=navigator.appCodeName;  
    document.Browser.Agent.value=navigator.userAgent;  
}
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
