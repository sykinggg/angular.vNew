import { Injectable } from '@angular/core';
declare var AMap: any;

// https://lbs.amap.com/api/javascript-api/reference/map
export interface MapOptions {
    // 地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图
    layers?: Array<any>;
    // 地图显示的缩放级别
    zoom?: Number;
    // 地图中心点坐标值
    center?: {
        w?: Number;
        s?: Number;
    }
    // 地图语言类型 可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照
    lang?: String;
}

@Injectable({
    providedIn: 'root'
})
export class AMapDefaultService {

    public aMapObj: any;

    constructor() { }

    public default(container: String | HTMLDivElement | any, opts?: MapOptions) {
        console.log(container);
        console.log(opts);
        this.aMapObj = AMap.Map(container);
        this.aMapObj.plugin('AMap.Geolocation', () => {
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
                maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
                convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,         // 显示定位按钮，默认：true
                buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            this.aMapObj.addControl(geolocation);
        });
        console.log(this.aMapObj);
    }

    public getAMapObj() {
        return this.aMapObj;
    }
}
