import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { InterviewContainerDirective } from '../interview-container-directive/interview-container.directive';
import { InterviewContainerService } from '../interview-container-service/interview-container.service';

export interface IInterviewDynamicComponent {
    outsideData: any;
}

@Component({
    selector: 'app-interview-container',
    templateUrl: './interview-container.component.html',
    styleUrls: ['./interview-container.component.scss']
})
export class InterviewContainerComponent implements OnInit {

    @Input() set option(data) {
        if (data) {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                data.forEach((item, idx) => {
                    this.loadComponent(item, !!idx);
                });

                if (!data.length) {
                    this.host.viewContainerRef.clear();
                }
            } else {
                this.loadComponent(data);
            }
        }
    };

    @Input() title: string;

    @ViewChild(InterviewContainerDirective) host: InterviewContainerDirective;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private interviewContainerService: InterviewContainerService
    ) { }

    ngOnInit() { }

    loadComponent(option, disClear?) {
        // let trueComponent = new CreateDyamicComponent(dynamicComponents[ads.type], ads.data);

        // 控制反转
        let componentFactor = this.componentFactoryResolver.resolveComponentFactory(this.interviewContainerService.getComponent(option.type));

        let viewContainerRef = this.host.viewContainerRef;
        if (!disClear) {
            // dom清除
            viewContainerRef.clear();
        }

        // 创建组件
        let componentRef = viewContainerRef.createComponent(componentFactor);

        // 动态赋值
        (<IInterviewDynamicComponent>componentRef.instance).outsideData = option.data;
    }
}
