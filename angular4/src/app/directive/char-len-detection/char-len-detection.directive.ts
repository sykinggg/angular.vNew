import { Directive, Input, Output, OnChanges, OnInit, EventEmitter, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appCharLenDetection]',
})
export class CharLenDetectionDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer) { }

    inspectLen: Function = function(value:String) {
        if(this.char) {
            let lenDif:Number = 0, char:String = value;
            for(var i in this.char) {
                if(this.char.charCodeAt(i) > 255) {
                    this.lenDif++;
                }
            }
            if(this.char.length + this.lenDif > this.length*2) {

            }
        }
    }

    @Input('length')
    length: Number

    @Output('setChar')
    setChar = new EventEmitter<any> ()

    @HostListener("document:change", ["$event"])
    onchange(event) {
        console.log(event);
    }
}
