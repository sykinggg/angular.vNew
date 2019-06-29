import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-js-this',
    templateUrl: './js-this.component.html',
    styleUrls: ['./js-this.component.scss']
})
export class JsThisComponent implements OnInit {

    public code = {
        html: this.sanitizer.bypassSecurityTrustHtml(`
input type=”button” onclick=”showInfo(this);” value=”点击一下”
        `),
        buildFun: this.sanitizer.bypassSecurityTrustHtml(`
function Animal(name, color) {
　　this.name = name;
　　this.color = color;
}
        `),
        inputGetValue: this.sanitizer.bypassSecurityTrustHtml(`
input type="button" id="text" value="点击一下" 

var btn = document.getElementById("text");
btn.onclick = function() {
    alert(this.value);    //此处的this是按钮元素
}
        `),
        applyCall: this.sanitizer.bypassSecurityTrustHtml(`
var  numbers = [5, 458 , 120 , -215 ]; 
var  maxInNumbers = Math.max.apply(this, numbers);  
console.log(maxInNumbers);  // 458
var maxInNumbers = Math.max.call(this,5, 458 , 120 , -215); 
console.log(maxInNumbers);  // 458
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
