import { Injectable } from '@angular/core';
import * as TWEEN from '@tweenjs/tween.js';

@Injectable({
    providedIn: 'root'
})
export class ImportTweenService {

    public tween: any = TWEEN;

    constructor() { }

    public getTweenObj() {
        return this.tween;
    }
}
