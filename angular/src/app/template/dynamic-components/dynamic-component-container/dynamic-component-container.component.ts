import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DynamicDirective } from '../dynamic.directive';
import { dynamicComponents } from '../dynamic';
import { IDynamicComponent } from '../Idynamic.component';
import { CreateDyamicComponent } from '../create-dynamic';

@Component({
    selector: 'app-dynamic-component-container',
    templateUrl: './dynamic-component-container.component.html',
    styleUrls: ['./dynamic-component-container.component.scss']
})
export class DynamicComponentContainerComponent implements OnInit {

    @Input() set ads(ads) {
        if (ads) {
            this.loadComponent(ads);
        }
    };
    @ViewChild(DynamicDirective) host: DynamicDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    loadComponent(ads) {
        // let trueComponent = new CreateDyamicComponent(dynamicComponents[ads.type], ads.data);

        // 控制反转
        let componentFactor = this.componentFactoryResolver.resolveComponentFactory(dynamicComponents[ads.type]);

        // dom清除
        let viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();

        // 创建组件
        let componentRef = viewContainerRef.createComponent(componentFactor);

        // 动态赋值
        (<IDynamicComponent>componentRef.instance).data = ads.data;
    }

}
