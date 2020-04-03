import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

    constructor() { }

    /**
     * 深拷贝 —— 数组|对象
     * 
     * obj: 任意的Obj
     * return new Obj
     */
    public cloneObj(obj: any): any {
        let str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (JSON) {
            str = JSON.stringify(obj), // 系列化对象
                newobj = JSON.parse(str); // 还原
        } else {
            for (let i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    this.cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }

    /**
     * isStatic —— 检测数据是不是除了symbol外的原始数据
     */
    public isStatic(value: any): any {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'undefined' ||
            value === null
        );
    }

    /**
     * isPrimitive —— 检测数据是不是原始数据
     */
    public isPrimitive(value: any): any {
        return this.isStatic(value) || typeof value === 'symbol';
    }

    /**
     * isObject —— 判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
     */
    public isObject(value: any): any {
        let type = typeof value;
        return value != null && (type === 'object' || type === 'function');
    }

    /**
     * isObjectLike —— 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
     */
    public isObjectLike(value: any): any {
        return value != null && typeof value === 'object';
    }

    /**
     * getRawType —— 获取数据类型，返回结果为 Number、String、Object、Array等
     */
    public getRawType(value: any): any {
        return Object.prototype.toString.call(value).slice(8, -1);
    }

    /**
     * isPlainObject —— 判断数据是不是Object类型的数据
     */
    public isPlainObject(obj: any): any {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /**
     * isArray —— 判断数据是不是数组类型的数据
     */
    public isArray(arr: any): any {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    /**
     * isRegExp —— 判断数据是不是数组类型的数据
     */
    public isRegExp(value: any): any {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }

    /**
     * isDate —— 判断数据是不是时间对象
     */
    public isDate(value: any): any {
        return Object.prototype.toString.call(value) === '[object Date]';
    }

    /**
     * isNative —— 判断value是不是浏览器内置函数
     *      内置函数toString后的主体代码块为 [native code]
     *      而非内置函数则为相关代码
     *      非内置函数可以进行拷贝(toString后掐头去尾再由Function转)
     */
    public isNative(value: any): any {
        return typeof value === 'function' && /native code/.test(value.toString());
    }

    /**
     * isFunction —— 检查value是不是函数
     */
    public isFunction(value: any): any {
        return Object.prototype.toString.call(value) === '[object Function]';
    }

    /**
     * isLength —— 检查value是否为有效的类数组长度
     */
    public isLength(value: any): any {
        return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
    }

    /**
     * isArrayLike —— 检查value是否是类数组
     *      如果一个值被认为是类数组，那么它不是一个函数,并且value.length是个整数
     *      大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER
     *      这里字符串也将被当作类数组
     */
    public isArrayLike(value: any): any {
        return value != null && this.isLength(value.length) && !this.isFunction(value);
    }

    /**
     * isEmpty —— 检查value是否为空
     *      如果是null，直接返回true；
     *      如果是类数组，判断数据长度；
     *      如果是Object对象，判断是否具有属性；
     *      如果是其他数据，直接返回false(也可改为返回true)
     */
    public isEmpty(value: any): any {
        if (value == null) {
            return true;
        }
        if (this.isArrayLike(value)) {
            return !value.length;
        } else if (this.isPlainObject(value)) {
            for (let key in value) {
                if (this.hasOwnProperty.call(value, key)) {
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * cached —— 记忆函数：缓存函数的运算结果
     */
    public cached(fn: Function): any {
        let cache = Object.create(null);
        return function cachedFn(str) {
            let hit = cache[str];
            return hit || (cache[str] = fn(str));
        }
    }

    /**
     * camelize —— 横线转驼峰命名
     */
    private camelizeRE = /-(w)/g;
    public camelize(str: string): string {
        return str.replace(this.camelizeRE, function (_, c) {
            return c ? c.toUpperCase() : '';
        })
    }

    /**
     * hyphenate —— 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
     */
    private hyphenateRE = /B([A-Z])/g;
    public hyphenate(str: string): string {
        return str.replace(this.hyphenateRE, '-$1').toLowerCase();
    }

    /**
     * capitalize —— 字符串首位大写
     */
    public capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * extend —— 将属性混合到目标对象中
     */
    public extend(to: any, _from: any): any {
        for (let key in _from) {
            to[key] = _from[key];
        }
        return to
    }

    /**
     * Object.assign —— 对象属性复制，浅拷贝
     * 
     *  使用Object.assign可以浅克隆一个对象
     *      let clone = Object.assign({}, target)
     *  简单的深克隆可以使用JSON.parse()和JSON.stringify()
     *  这两个api是解析json数据的，所以只能解析除symbol外的原始类型及数组和对象
     *      let clone = JSON.parse( JSON.stringify(target) )
     */
    public assign() {
        Object.assign = Object.assign || function () {
            if (arguments.length === 0) {
                throw new TypeError('Cannot convert undefined or null to object')
            }

            let target = arguments[0],
                args = Array.prototype.slice.call(arguments, 1),
                key
            args.forEach(function (item) {
                for (key in item) {
                    if (item.hasOwnProperty(key)) {
                        target[key] = item[key];
                    }
                }
            })
            return target
        }
    }

    /**
     * clone —— 克隆数据，可深度克隆
     * 
     * 原始类型，时间、正则、错误、数组、对象的克隆规则
     */
    public clone(value, deep): any {
        if (this.isPrimitive(value)) {
            return value
        }

        if (this.isArrayLike(value)) { // 是类数组
            value = Array.prototype.slice.call(value)
            return value.map(item => deep ? this.clone(item, deep) : item)
        } else if (this.isPlainObject(value)) { // 是对象
            let target = {}, key;
            for (key in value) {
                if (value.hasOwnProperty(key)) {
                    target[key] = deep ? this.clone(value[key], deep) : value[key]
                }
            }
        }

        let type = this.getRawType(value)

        switch (type) {
            case 'Date':
            case 'RegExp':
            case 'Error': value = this[type](value); break;
        }
        return value
    }

    /**
     * identifyVariousBrowsers —— 识别各种浏览器及平台
     */
    public identifyVariousBrowsers() {
        let inBrowser: Boolean = false,
            inWeex: Boolean = false,
            weexPlatform: any,
            UA: string,
            isIE: Boolean = false,
            isIE9: Boolean = false,
            isEdge: Boolean = false,
            isAndroid: Boolean = false,
            isIOS: Boolean = false,
            isChrome: Boolean = false,
            WXEnvironment: any = window['WXEnvironment'];

        // 运行环境是浏览器
        inBrowser = typeof window !== 'undefined';

        // 运行环境是微信
        if (WXEnvironment) {
            inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
            weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();

        }
        // 浏览器 UA 判断
        UA = inBrowser && window.navigator.userAgent.toLowerCase();
        isIE = UA && /msie|trident/.test(UA);
        isIE9 = UA && UA.indexOf('msie 9.0') > 0;
        isEdge = UA && UA.indexOf('edge/') > 0;
        isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
        isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
        isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;

        return {
            inBrowser,
            inWeex,
            weexPlatform,
            UA,
            isIE,
            isIE9,
            isEdge,
            isAndroid,
            isIOS,
            isChrome,
            WXEnvironment
        }
    }

    /**
     * getExplorerInfo —— 获取浏览器信息
     */
    public getExplorerInfo(): any {
        let t: string = navigator.userAgent.toLowerCase();
        return 0 <= t.indexOf("msie") ? { // ie < 11
            type: "IE",
            version: Number(t.match(/msie ([d]+)/)[1])
        } : !!t.match(/trident.+? rv : (([d.] +)) /) ? { // ie 11
            type: "IE",
            version: 11
        } : 0 <= t.indexOf("edge") ? {
            type: "Edge",
            version: Number(t.match(/edge([d] +) /)[1])
        } : 0 <= t.indexOf("firefox") ? {
            type: "Firefox",
            version: Number(t.match(/firefox([d] +) /)[1])
        } : 0 <= t.indexOf("chrome") ? {
            type: "Chrome",
            version: Number(t.match(/chrome([d] +) /)[1])
        } : 0 <= t.indexOf("opera") ? {
            type: "Opera",
            version: Number(t.match(/opera.([d]+)/)[1])
        } : 0 <= t.indexOf("Safari") ? {
            type: "Safari",
            version: Number(t.match(/version([d] +) /)[1])
        } : {
                                        type: t,
                                        version: -1
                                    }
    }

    /**
     * isPCBroswer —— 检测是否为PC端浏览器模式
     */
    public isPCBroswer() {
        let e: string = navigator.userAgent.toLowerCase(),
            t = Boolean(e.match('ipad')),
            i = Boolean(e.match('iphone')),
            r = Boolean(e.match('midp')),
            n = Boolean(e.match('rv:1.2.3.4')),
            a = Boolean(e.match('ucweb')),
            o = Boolean(e.match('android')),
            s = Boolean(e.match('windows ce')),
            l = Boolean(e.match('windows mobile'));
        return !(t || i || r || n || a || o || s || l);
    }

    /**
     * unique —— 数组去重，返回一个新数组
     */
    public unique(arr: Array<any>): Array<any> {
        if (!this.isArrayLike(arr)) { // 不是类数组对象
            return arr
        }
        let result = []
        let objarr = []
        let obj = Object.create(null)

        arr.forEach(item => {
            if (this.isStatic(item)) { // 是除了symbol外的原始数据
                let key = item + '_' + this.getRawType(item);
                if (!obj[key]) {
                    obj[key] = true
                    result.push(item)
                }
            } else { // 引用类型及symbol
                if (!objarr.includes(item)) {
                    objarr.push(item)
                    result.push(item)
                }
            }
        })

        return result;
    }

    /**
     * window —— Set简单实现
     */
    public defaultWindowSet() {
        // window['Set'] = window['Set'] || (function () {
        //     function Set(arr) {
        //         this.items = arr ? this.unique(arr) : [];
        //         this.size = this.items.length; // Array的大小
        //     }
        //     Set.prototype = {
        //         add: function (value) {
        //             // 添加元素,若元素已存在,则跳过，返回 Set 结构本身。
        //             if (!this.has(value)) {
        //                 this.items.push(value);
        //                 this.size++;
        //             }
        //             return this;
        //         },
        //         clear: function () {
        //             // 清除所有成员，没有返回值。
        //             this.items = []
        //             this.size = 0
        //         },
        //         delete: function (value) {
        //             // 删除某个值，返回一个布尔值，表示删除是否成功。
        //             return this.items.some((v, i) => {
        //                 if (v === value) {
        //                     this.items.splice(i, 1)
        //                     return true
        //                 }
        //                 return false
        //             })
        //         },
        //         has: function (value) {
        //             // 返回一个布尔值，表示该值是否为Set的成员。
        //             return this.items.some(v => v === value)
        //         },
        //         values: function () {
        //             return this.items
        //         },
        //     }

        //     return Set;
        // }());
    }

    /**
     * repeat —— 生成一个重复的字符串，有n个str组成，可修改为填充为数组等
     */
    public repeat(str: string, n: any): string {
        let res = '';
        while (n) {
            if (n % 2 === 1) {
                res += str;
            }
            if (n > 1) {
                str += str;
            }
            // tslint:disable-next-line:no-bitwise
            n >>= 1;
        }
        return res
    }

    /**
     * dateFormater —— 格式化时间
     */
    public dateFormater(formater: string, t: Date): string {
        let date = t ? new Date(t) : new Date(),
            Y = date.getFullYear() + '',
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        return formater.replace(/YYYY|yyyy/g, Y)
            .replace(/YY|yy/g, Y.substr(2, 2))
            .replace(/MM/g, (M < 10 ? '0' : '') + M)
            .replace(/DD/g, (D < 10 ? '0' : '') + D)
            .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
            .replace(/mm/g, (m < 10 ? '0' : '') + m)
            .replace(/ss/g, (s < 10 ? '0' : '') + s)
    }

    /**
     * dateStrForma —— 将指定字符串由一种时间格式转化为另一种
     * 
     *      from的格式应对应str的位置
     */
    public dateStrForma(str: string, from: string, to: string): string {
        // '20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
        str += ''
        let Y: any = ''
        // tslint:disable-next-line:no-bitwise
        if (~(Y = from.indexOf('YYYY'))) {
            Y = str.substr(Y, 4)
            to = to.replace(/YYYY|yyyy/g, Y)
            // tslint:disable-next-line:no-bitwise
        } else if (~(Y = from.indexOf('YY'))) {
            Y = str.substr(Y, 2)
            to = to.replace(/YY|yy/g, Y)
        }

        let k, i
        ['M', 'D', 'H', 'h', 'm', 's'].forEach(s => {
            i = from.indexOf(s + s)
            // tslint:disable-next-line:no-bitwise
            k = ~i ? str.substr(i, 2) : ''
            to = to.replace(s + s, k)
        })
        return to
    }

    /**
     * getPropByPath —— 根据字符串路径获取对象属性 : 'obj[0].count'
     */
    public getPropByPath(obj, path, strict) {
        let tempObj = obj;
        path = path.replace(/[(w+)]/g, '.$1'); // 将[0]转化为.0
        path = path.replace(/^./, ''); // 去除开头的.

        let keyArr = path.split('.'); // 根据.切割
        let i = 0;
        for (let len = keyArr.length; i < len - 1; ++i) {
            if (!tempObj && !strict) {
                break
            };
            let key = keyArr[i];
            if (key in tempObj) {
                tempObj = tempObj[key];
            } else {
                if (strict) { // 开启严格模式，没找到对应key值，抛出错误
                    throw new Error('please transfer a valid prop path to form item!');
                }
                break;
            }
        }
        return {
            o: tempObj, // 原始数据
            k: keyArr[i], // key值
            v: tempObj ? tempObj[keyArr[i]] : null // key值对应的值
        };
    }

    /**
     * GetUrlParam —— 获取Url参数，返回一个对象
     */
    public GetUrlParam(): any {
        let url = document.location.toString();
        let arrObj = url.split("?");
        let params = Object.create(null)
        if (arrObj.length > 1) {
            arrObj = arrObj[1].split("&");
            arrObj.forEach((item: any) => {
                item = item.split("=");
                params[item[0]] = item[1]
            })
        }
        return params;
    }

    /**
     * downloadFile —— base64数据导出文件，文件下载
     */
    public downloadFile(filename, data) {
        let DownloadLink: any = document.createElement('a');
        if (DownloadLink) {
            document.body.appendChild(DownloadLink);
            DownloadLink.style = 'display: none';
            DownloadLink.download = filename;
            DownloadLink.href = data;

            if (document.createEvent) {
                let DownloadEvt = document.createEvent('MouseEvents');

                DownloadEvt.initEvent('click', true, false);
                DownloadLink.dispatchEvent(DownloadEvt);
            } else if (document['createEventObject']) {
                DownloadLink.fireEvent('onclick');
            } else if (typeof DownloadLink.onclick === 'function') {
                DownloadLink.onclick();
            }

            document.body.removeChild(DownloadLink);
        }
    }

    /**
     * toFullScreen —— 全屏
     */
    public toFullScreen() {
        let elem: any = document.body;
        if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen()
        } else {
            if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen()
            } else {
                if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen()
                } else {
                    if (elem.requestFullScreen) {
                        elem.requestFullScreen();
                    } else {
                        console.warn("浏览器不支持全屏");
                    }
                }
            }
        }
    }

    /**
     * exitFullscreen —— 退出全屏
     */
    public exitFullscreen() {
        let elem: any = parent.document;
        elem.webkitCancelFullScreen
            ? elem.webkitCancelFullScreen()
            : elem.mozCancelFullScreen
                ? elem.mozCancelFullScreen()
                : elem.cancelFullScreen
                    ? elem.cancelFullScreen()
                    : elem.msExitFullscreen
                        ? elem.msExitFullscreen()
                        : elem.exitFullscreen
                            ? elem.exitFullscreen()
                            : console.warn("切换失败,可尝试Esc退出");
    }

    /**
     * requestAnimationFrame —— window动画
     * 
     *      与setTimeout和setInterval不同，requestAnimationFrame不需要设置时间间隔
     *      严格系统时间执行 h5新标准
     */
    public defaultRequestAnimationFrame() {
        window.requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window['mozRequestAnimationFrame'] ||
            window['msRequestAnimationFrame'] ||
            window['oRequestAnimationFrame'] ||
            function (callback) {
                // 为了使setTimteout的尽可能的接近每秒60帧的效果
                window.setTimeout(callback, 1000 / 60);
            };

        window.cancelAnimationFrame = window.cancelAnimationFrame ||
            Window['webkitCancelAnimationFrame'] ||
            window['mozCancelAnimationFrame'] ||
            window['msCancelAnimationFrame'] ||
            window['oCancelAnimationFrame'] ||
            function (id) {
                // 为了使setTimteout的尽可能的接近每秒60帧的效果
                window.clearTimeout(id);
            }
    }

    /**
     * _isNaN —— 检查数据是否是非数字值
     * 
     *  原生的isNaN会把参数转换成数字(valueof)
     *      null、true、false以及长度小于等于1的数组(元素为非NaN数据)会被转换成数字
     *  Symbol类型的数据不具有valueof接口，所以isNaN会抛出错误，这里放在后面，可避免错误
     */
    public _isNaN(v: any): Boolean {
        let numV = +v;
        return !(typeof v === 'string' || typeof v === 'number') || isNaN(numV);
    }

    /**
     * max —— 求取数组中非NaN数据中的最大值
     */
    public max(arr: Array<any>): number | undefined {
        arr = arr.filter(item => !this._isNaN(item))
        return arr.length ? Math.max.apply(null, arr) : undefined
    }

    /**
     * min —— 求取数组中非NaN数据中的最小值
     */
    public min(arr: Array<any>): number | undefined {
        arr = arr.filter(item => !this._isNaN(item))
        return arr.length ? Math.min.apply(null, arr) : undefined
    }

    /**
     * random —— 返回一个lower-upper之间的随机数
     * 
     *  lower、upper无论正负与大小，但必须是非NaN的数据
     */
    public random(lower: number, upper: number): number {
        lower = +lower || 0
        upper = +upper || 0
        return Math.random() * (upper - lower) + lower;
    }

    /**
     * Object.keys —— 返回一个由一个给定对象的自身可枚举属性组成的数组
     */
    public objectKey(object: any): any {
        if (object === null || object === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        let result = []
        if (this.isArrayLike(object) || this.isPlainObject(object)) {
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    result.push(key);
                }
            }
        }
        return result
    }

    /**
     * Object.values —— 返回一个给定对象自身的所有可枚举属性值的数组
     */
    public objectValues(object: any): any {
        if (object === null || object === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        let result = []
        if (this.isArrayLike(object) || this.isPlainObject(object)) {
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    result.push(object[key]);
                }
            }
        }
        return result
    }

    /**
     * arr.fill —— 使用 value 值来填充 array，从start位置开始, 到end位置结束（但不包含end位置），返回原数组
     */
    public defaultArrFill() {
        Array.prototype.fill = Array.prototype.fill || function fill(value, start: number | string, end) {
            let ctx = this
            let length = ctx.length;

            // start = parseInt(start)
            start = +start;
            if (isNaN(start)) {
                start = 0
            } else if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }

            // end = parseInt(end)
            end = +end;
            if (isNaN(end) || end > length) {
                end = length
            } else if (end < 0) {
                end += length;
            }

            while (start < end) {
                start = +start;
                ctx[start++] = value;
            }
            return ctx;
        }
    }

    /**
     * arr.includes —— 用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false，可指定开始查询的位置
     */
    public defaultArrIncludes() {
        Array.prototype.includes = Array.prototype.includes || function includes(value, start) {
            let ctx = this
            let length = ctx.length;

            // start = parseInt(start)
            start = +start;
            if (isNaN(start)) {
                start = 0
            } else if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }

            let index = ctx.indexOf(value)

            return index >= start;
        }
    }

    /**
     * arr.find —— 返回数组中通过测试（函数fn内判断）的第一个元素的值
     */
    // public defaultArrFind() {
    //     Array.prototype.find = Array.prototype.find || function find(fn, ctx) {
    //         ctx = ctx || this

    //         let result;
    //         ctx.some((value, index, arr), thisValue) => {
    //             return fn(value, index, arr) ? (result = value, true) : false
    //         });

    //         return result
    //     }
    // }

    /**
     * banCertainKeyboardEvents —— 禁止某些键盘事件
     */
    public banCertainKeyboardEvents() {
        document.addEventListener('keydown', function (event) {
            return !(
                112 === event.keyCode || // F1
                123 === event.keyCode || // F12
                event.ctrlKey && 82 === event.keyCode || // ctrl + R
                event.ctrlKey && 78 === event.keyCode || // ctrl + N
                event.shiftKey && 121 === event.keyCode || // shift + F10
                event.altKey && 115 === event.keyCode || // alt + F4
                "A" === event.srcElement['tagName'] && event.shiftKey // shift + 点击a标签
            ) || (event.returnValue = false)
        });
    }

    /**
     * prohibitClickSelectCopy —— 禁止右键、选择、复制
     */
    public prohibitClickSelectCopy() {
        ['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
            document.addEventListener(ev, function (event) {
                return event.returnValue = false
            })
        });
    }
}
