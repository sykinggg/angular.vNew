import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-js-closures',
    templateUrl: './js-closures.component.html',
    styleUrls: ['./js-closures.component.scss']
})
export class JsClosuresComponent implements OnInit {

    public code = this.sanitizer.bypassSecurityTrustHtml(`

http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

var name = "The Window";

var object = {
　　name : "My Object",

　　getNameFunc : function(){
　　　　return function(){
　　　　　　return this.name;
　　　　};

　　}

};

alert(object.getNameFunc()()); The Window

var name = "The Window";

var object = {
　　name : "My Object",

　　getNameFunc : function(){
　　　　var that = this;
　　　　return function(){
　　　　　　return that.name;
　　　　};

　　}

};

alert(object.getNameFunc()()); My Object

https://segmentfault.com/a/1190000019411134
另一个栗子

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return I * I;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
f1(); // 16
f2(); // 16
f3(); // 16

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

f1(); // 1
f2(); // 4
f3(); // 9
    `)

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
