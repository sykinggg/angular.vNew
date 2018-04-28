import { Directive, Input, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appMySecDirective]'
})
export class MySecDirectiveDirective {
    @Input() greet: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer) { 
        console.log(this);
    }

    @HostBinding() get innerText() {
        // console.log(this);
        return this.greet;
    }

}
