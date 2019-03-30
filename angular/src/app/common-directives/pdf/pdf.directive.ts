import { Directive } from '@angular/core';

@Directive({
    selector: '[appPdf]'
})
export class PdfDirective {
    viewContainerRef: any;

    constructor() { }

}
