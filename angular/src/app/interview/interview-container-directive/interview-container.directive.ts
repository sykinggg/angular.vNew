import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appInterviewContainer]'
})
export class InterviewContainerDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
