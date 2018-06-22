import { Directive } from '@angular/core';

@Directive({
    selector: '[appMapDirective]'
})
export class MapDirectiveDirective {

    constructor() { }

    test(): Array<Number> {
        return [1, 2, 3, 4, 5, 6]
    }

}
