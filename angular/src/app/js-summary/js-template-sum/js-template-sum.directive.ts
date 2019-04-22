import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appJsTemplateSum]'
})
export class JsTemplateSumDirective {

    constructor(public templateRef: TemplateRef<any>) { }

}
