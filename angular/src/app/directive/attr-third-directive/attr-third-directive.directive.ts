import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appAttrThirdDirective]'
})
export class AttrThirdDirectiveDirective {

    constructor(private el: ElementRef) { }

    @Input('appHightlight')
    highlightColor: String

    private highlight(color: String) {
        this.el.nativeElement.style.backgroundColor = color;
    }

    @HostListener('mouseenter') onmouseenter() {
        this.highlight(this.highlightColor || 'red');
    }

    @HostListener('mouseleave') onmouseleave() {
        this.highlight(null);
    }
}
