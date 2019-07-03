import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-js-event-commission',
    templateUrl: './js-event-commission.component.html',
    styleUrls: ['./js-event-commission.component.scss']
})
export class JsEventCommissionComponent implements OnInit {

    public code = this.sanitizer.bypassSecurityTrustHtml(`

<!-- 没有给p元素设置data-name，点击p元素时会显示data-name为null -->
<div id="grandFather" data-name="grandFather" style="width: 700px;height: 700px; background-color: red">
    <p>grandFather</p>
    <div id="father1" data-name="father1" style="width: 300px; height: 300px; background-color: pink">
        <p>father1</p>
        <div id="son1" data-name="son1" style="width: 100px; height: 100px; background-color: yellow">
            <p>son1</p>
        </div>
    </div>
    <div id="father2" data-name="father2" style="width: 300px;height: 300px; background-color: green">
        <p>father2</p>
    </div>
</div>

// 事件代理
 grandFather.addEventListener('click', function(event){
    console.log('I am ' + event.target.getAttribute('data-name'));
},false);


    `)

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
