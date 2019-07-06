import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appAMapView]'
})
export class AMapViewDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
