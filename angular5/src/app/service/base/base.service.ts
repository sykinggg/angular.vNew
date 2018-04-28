import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

    constructor() { }
    // 深拷贝——数组|对象
    cloneObj(obj: any): any {
        let str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (JSON) {
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    this.cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }
}
