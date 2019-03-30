import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPdf]'
})
export class PdfDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }

}
