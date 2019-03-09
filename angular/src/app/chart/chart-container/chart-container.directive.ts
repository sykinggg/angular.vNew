import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appChartContainer]'
})
export class ChartContainerDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
