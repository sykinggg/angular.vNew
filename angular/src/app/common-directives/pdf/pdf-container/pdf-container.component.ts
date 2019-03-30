import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PdfDirective } from '../pdf.directive';
import { pdfContainer, IpdfContainerComponent } from '../pdf-container';

@Component({
    selector: 'app-pdf-container',
    templateUrl: './pdf-container.component.html',
    styleUrls: ['./pdf-container.component.scss']
})
export class PdfContainerComponent implements OnInit {

    @ViewChild(PdfDirective) host: PdfDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    loadComponent(option, disClear?) {
        // let trueComponent = new CreateDyamicComponent(dynamicComponents[ads.type], ads.data);

        // 控制反转
        let componentFactor = this.componentFactoryResolver.resolveComponentFactory(pdfContainer[option.type]);

        let viewContainerRef = this.host.viewContainerRef;
        if (!disClear) {
            // dom清除
            viewContainerRef.clear();
        }

        // 创建组件
        let componentRef = viewContainerRef.createComponent(componentFactor);

        // 动态赋值
        (<IpdfContainerComponent>componentRef.instance).outsideData = option.data;
    }

}
