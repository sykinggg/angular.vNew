import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appThree]'
})
export class ThreeDirective {

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainerRef: ViewContainerRef,
    ) { }

}
