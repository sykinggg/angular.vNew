import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-js-type-of',
    templateUrl: './js-type-of.component.html',
    styleUrls: ['./js-type-of.component.scss']
})
export class JsTypeOfComponent implements OnInit {

    public code = {
        typeof: this.sanitizer.bypassSecurityTrustHtml(`
console.log("测试number:"+typeof 1);
测试number:number
console.log("测试string:"+typeof "str");
测试string:string
console.log("测试false:"+typeof false);
测试false:boolean
console.log("测试null:"+typeof null);
测试null:object
console.log("测试undefined:"+typeof undefined);
测试undefined:undefined
console.log("测试Object:"+typeof new Object());
测试Object:object
console.log("测试Object:"+typeof new Array());
测试Object:object
console.log("看看typeof NaN是啥:"+typeof NaN);
看看typeof NaN是啥:number
console.log("我想看看数组［1，2，3]类型:"+typeof [1,2,3]);
我想看看数组［1，2，3]类型:object
console.log("看看function是啥:"+typeof function(){});
看看function是啥:function
        `),
        objectToString: this.sanitizer.bypassSecurityTrustHtml(`
Object.prototype.toString.apply();
"[object Undefined]"
Object.prototype.toString.apply(1);
"[object Number]"
Object.prototype.toString.apply('1');
"[object String]"
Object.prototype.toString.apply(null);
"[object Null]"
Object.prototype.toString.apply(function a() {});
"[object Function]"
Object.prototype.toString.apply({});
"[object Object]"
Object.prototype.toString.apply([]);
"[object Array]"

apply call 都可
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
