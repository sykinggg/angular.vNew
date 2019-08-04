import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { IChartDynamicComponent, ChartDynamicComponent } from '../chart-container';
import { ChartContainerDirective } from '../chart-container.directive';

@Component({
    selector: 'app-chart-container',
    templateUrl: './chart-container.component.html',
    styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

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
    @ViewChild(ChartContainerDirective, { static: true }) host: ChartContainerDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    loadComponent(option, disClear?) {
        // let trueComponent = new CreateDyamicComponent(dynamicComponents[ads.type], ads.data);

        // 控制反转
        let componentFactor = this.componentFactoryResolver.resolveComponentFactory(ChartDynamicComponent[option.fType][option.type]);

        let viewContainerRef = this.host.viewContainerRef;
        if (!disClear) {
            // dom清除
            viewContainerRef.clear();
        }

        // 创建组件
        let componentRef = viewContainerRef.createComponent(componentFactor);

        // 动态赋值
        (<IChartDynamicComponent>componentRef.instance).outsideData = option.data;
    }

}
