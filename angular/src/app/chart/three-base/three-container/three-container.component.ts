import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { ThreeDirective } from '../three.directive';
import { IThreeDynamicComponent, ThreeDynamicComponent } from '../three.index';

@Component({
    selector: 'app-three-container',
    templateUrl: './three-container.component.html',
    styleUrls: ['./three-container.component.scss']
})
export class ThreeContainerComponent implements OnInit {

    @Input() set option(data) {
        if (data) {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                data.forEach((item, idx) => {
                    this.loadComponent(item, !!idx);
                });
            } else {
                this.loadComponent(data);
            }
        }
    };
    @ViewChild(ThreeDirective, { static: true }) host: ThreeDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    loadComponent(option, disClear?) {
        // let trueComponent = new CreateDyamicComponent(dynamicComponents[ads.type], ads.data);

        // 控制反转
        let componentFactor = this.componentFactoryResolver.resolveComponentFactory(ThreeDynamicComponent[option.type]);

        let viewContainerRef = this.host.viewContainerRef;
        if (!disClear) {
            // dom清除
            viewContainerRef.clear();
        }

        // 创建组件
        let componentRef = viewContainerRef.createComponent(componentFactor);

        // 动态赋值
        (<IThreeDynamicComponent>componentRef.instance).outsideData = option.data;
    }

}
