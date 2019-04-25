import { Injectable } from '@angular/core';

import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class ThreeBaseService {

    public three: any = THREE;

    constructor() {

        // 浏览器兼容
        window['requestAnimFrame'] = function () {
            return (
                window['requestAnimationFrame'] ||
                window['webkitRequestAnimationFrame'] ||
                window['mozRequestAnimationFrame'] ||
                window['oRequestAnimationFrame'] ||
                window['msRequestAnimationFrame'] ||
                function (/* function */ callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        }();
    }

    public getThreeObj() {
        return this.three;
    }
}
