import { Directive, Input, ElementRef, Renderer, HostListener } from '@angular/core';

// 自定义属性指令
@Directive({
  selector: '[appMyFirstDirective]'
})
export class MyFirstDirectiveDirective {
  private _defaultColor = 'yellow';

  @Input('inputBGC')
  backgroundColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer) { 
      this.setStyle(this._defaultColor);
  }

  @HostListener('click')
  onClick() {
    this.setStyle(this.backgroundColor || this._defaultColor);
  }

  private setStyle(color: string) {
    this.renderer.setElementStyle(this.elementRef.nativeElement, 
    'backgroundColor', color);
  }

}
