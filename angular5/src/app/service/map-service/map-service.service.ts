import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/Rx'
declare var AMap: any;

@Injectable()
export class MapServiceService {

    constructor() { }
    // 创建地图对象
    createMap(mapName: String): Object {
        let map = new AMap.Map(mapName);
        map.plugin('AMap.Geolocation', () => {
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
        });
        return map;
    }
    // 加载工具条
    setToolBar(mapObject: any): Object {
        // 自定义工具条对象
        let returnObject: Object;
        // 自定义Marker
        let customMarker = new AMap.Marker({
            offset: new AMap.Pixel(-14, -34),// 相对于基点的位置
            icon: new AMap.Icon({  // 复杂图标
                size: new AMap.Size(27, 36),// 图标大小
                image: "http://webapi.amap.com/images/custom_a_j.png", // 大图地址
                imageOffset: new AMap.Pixel(-28, 0)// 相对于大图的取图位置
            })
        });
        // 加载地图工具条
        mapObject.plugin(["AMap.ToolBar"], () => {
            returnObject = new AMap.ToolBar({ locationMarker: customMarker });
            mapObject.addControl(returnObject);
        });
        return returnObject;
    }
    // 加载比例尺
    setScale(mapObject: any): Object {
        // 自定义比例尺对象
        let returnObject: Object;
        mapObject.plugin(["AMap.Scale"], () => {
            returnObject = new AMap.Scale();
            mapObject.addControl(returnObject);
        });
        return returnObject;
    }
    // 加载地图实景（含路况）
    setMapType(mapObject: any): Object {
        // 自定义地图实景对象
        let returnObject: Object;
        mapObject.plugin(["AMap.MapType"], () => {
            returnObject = new AMap.MapType();
            mapObject.addControl(returnObject);
        });
        return returnObject;
    }
    // 加载鹰眼
    setOverView(mapObject: any): Object {
        // 自定义鹰眼对象
        let returnObject: any;
        mapObject.plugin(["AMap.OverView"], () => {
            returnObject = new AMap.OverView();
            returnObject.open();
            mapObject.addControl(returnObject);
        });
        return returnObject;
    }
    // 自定义搜索功能
    defaultSearch(mapObject: any, inputId: String, defaultCity: String): void {
        // 自定义搜索功能对象
        let returnObject: any;
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
            map: mapObject
        });
        //详情查询 -> 首先定位到成都
        placeSearch.getDetails(defaultCity, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                placeSearch_CallBack(result);
            }
        });

        var autoOptions = {
            input: inputId
        };
        //搜索信息-自动匹配
        var autocomplete = new AMap.Autocomplete(autoOptions);
        AMap.event.addListener(autocomplete, "complete", function (e) {
            console.log(e);
        });

        //自定义监听——注册监听，当选中某条记录时会触发
        AMap.event.addListener(autocomplete, "select", select);//
        function select(e) {
            console.log(e.poi)
            placeSearch.setCity(e.poi.adcode);//通过ID定位
            placeSearch.getDetails(e.poi.id, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    placeSearch_CallBack(result);//执行回调函数
                }
            });
        }
        //通过 infoWindow  显示信息
        var infoWindow = new AMap.InfoWindow({
            autoMove: true,
            offset: { x: 0, y: -30 }
        });
        //回调函数
        var placeSearch_CallBack = (data) => {
            var poiArr = data.poiList.pois;
            //添加marker
            var marker = new AMap.Marker({
                map: mapObject,
                position: poiArr[0].location
            });
            mapObject.setCenter(marker.getPosition());
            infoWindow.setContent(createContent(poiArr[0]));
            infoWindow.open(mapObject, marker.getPosition());
        }
        //信息窗体 infoWindow 内容
        function createContent(poi) {
            var s = [];
            s.push("<b>名称：" + poi.name + "</b>");//里面有很多信息可以自定义
            s.push("地址：" + poi.address);
            s.push("电话：" + poi.tel);
            s.push("类型：" + poi.type);
            s.push("经度：" + poi.location.lng);
            s.push("纬度：" + poi.location.lng);
            return s.join("<br>");
        }
    }
    // 折线|多边形——展示|编辑
    mapPolyShow(mapObject: any, pointArr: any, polygonSetting: any, type: String): Object {
        let arr = new Array();//经纬度坐标数组 
        let returnData: Object;
        let polygon: Object;
        pointArr.forEach(element => {
            let data: Object = new AMap.LngLat(element.lng, element.lat);
            arr.push(data);
        });

        polygonSetting.map = mapObject;
        polygonSetting.path = arr;
        if (type === 'line') {
            polygon = new AMap.Polyline(polygonSetting);
        } else if (type === 'gon') {
            polygon = new AMap.Polygon(polygonSetting);
        }
        //地图上添加折线
        returnData = {
            editObject: new AMap.PolyEditor(mapObject, polygon),
            object: polygon
        }
        mapObject.setFitView();
        return returnData;
    }
    // 圆——展示|编辑
    mapCircleShow(mapObject: any, circlePoint: any, polygonSetting: any): Object {
        let returnData: any, circleObj: any;
        // 初始化配置
        polygonSetting.center = [circlePoint.lng, circlePoint.lat];
        // 实例化圆对象
        circleObj = new AMap.Circle(polygonSetting);
        // 地图自适应
        circleObj.setMap(mapObject);
        // 设置返回对象
        returnData = {
            editObject: new AMap.CircleEditor(mapObject, circleObj),
            object: circleObj
        }
        mapObject.setFitView();
        return returnData;
    }
    // 距离测量
    rangingTool(mapObject: any, lOptions: Object): Object {
        let returnObject: any;
        let ruler1 = new AMap.RangingTool(mapObject);
        AMap.event.addListener(ruler1, "end", (e) => {
            ruler1.turnOff();
        });
        let sMarker = {
            icon: new AMap.Icon({
                size: new AMap.Size(19, 31),//图标大小
                image: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png"
            })
        };
        let eMarker = {
            icon: new AMap.Icon({
                size: new AMap.Size(19, 31),//图标大小
                image: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png"
            }),
            offset: new AMap.Pixel(-9, -31)
        };
        let rulerOptions = {
            startMarkerOptions: sMarker,
            endMarkerOptions: eMarker,
            lineOptions: lOptions
        };
        let ruler2 = new AMap.RangingTool(mapObject, rulerOptions);
        returnObject = {
            ruler1: ruler1,
            ruler2: ruler2
        }
        return returnObject;
    }
    mapMouseTool(mapObject): any {
        let mouseTool = new AMap.MouseTool(mapObject);
        return mouseTool;
    }
    // 鼠标工具
    mouseTool(mapObject: any, callBack: Function, choiceMapData: String): any {
        let mouseTool = new AMap.MouseTool(mapObject);
        if(typeof choiceMapData == 'string') {
            mouseTool[choiceMapData]();
        }
        // mouseTool.marker();
        //鼠标工具插件添加draw事件监听
        AMap.event.addListener(mouseTool, "draw", callBack)
        // mouseTool.measureArea();  //调用鼠标工具的面积量测功能
        if(typeof mouseTool.turnOff == 'function') {
            mouseTool.turnOff();
        }
    }

    test(): Promise<any> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 2000);
        });
    }
    // 默认获取当前视野的地址信息
    // mapMoveend(mapObject: any): Object {
    //     // 返回当前地址对象
    //     let returnObject: any;
    //     let getCity: Function = () => {
    //         mapObject.getCity((data) => {
    //             // console.log(data);
    //             returnObject = data;
    //             // if (data['province'] && typeof data['province'] === 'string') {
    //             //     document.getElementById('info').innerHTML = '城市：' + (data['city'] || data['province']);
    //             // }
    //         })
    //     }
    //     mapObject.on('moveend', getCity);
    //     return returnObject
    // }
    // 缩放级别
    // defaultZoomend(mapObject: any) {
    //     AMap.event.addListener(mapObject, 'zoomend', this.getZoom())
    // }
}
