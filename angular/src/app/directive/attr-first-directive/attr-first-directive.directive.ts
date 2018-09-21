import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAttrFirstDirective]'
})
export class AttrFirstDirectiveDirective {

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

}
