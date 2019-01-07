import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[dynamic-host]',
})

export class DynamicDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
