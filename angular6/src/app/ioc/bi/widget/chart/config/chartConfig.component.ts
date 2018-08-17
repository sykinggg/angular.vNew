import { Component, AfterViewInit, OnInit, Input, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'chart-config',
    template: require('./chartConfig.component.html!text')
})

export class ChartConfigShowComponent implements AfterViewInit, OnInit {
    @ViewChild('show', {read: ViewContainerRef}) show: ViewContainerRef;
    @ViewChild('group') group: TemplateRef<any>;

    constructor() {}

    ngOnInit() {
        let view = this.group.createEmbeddedView(null);
        this.show.insert(view);
    }

    ngAfterViewInit() {
        
    }
}