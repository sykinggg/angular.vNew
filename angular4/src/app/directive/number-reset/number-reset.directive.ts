import { Directive, Input, Output, EventEmitter, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appNumberReset]'
})
export class NumberResetDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer) { }

    defaultNum: Function = function(num: number) {
        let numData: number, numStr;
        if(this.type === 0) {
            numData = num | 0;
        }else{
            numStr = num + '';
            if(numStr.split('.')[1]&&numStr.split('.')[1].length) {
                numData = +numStr.substring(0, numStr.indexOf('.')+this.type+1);
            }
        }
        this.setNum.emit(numData);
    }

    @Input('retainedDecimal')
    type: number;

    @Output('setNum')
    setNum = new EventEmitter<any>();

    // @HostBinding() get innerText() {
    //     console.log(this);
    // }
    @HostListener('document:change', ['$event'])
    onChange(event) {
        this.defaultNum(event.target.value);
    }

}
