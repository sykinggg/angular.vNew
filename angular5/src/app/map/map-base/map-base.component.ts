import { Component, OnInit } from '@angular/core';
import { MapServiceService } from '../../service/map-service/map-service.service';
import { BaseService } from '../../service/base/base.service';
import { Observable } from "rxjs";
import 'rxjs/Rx';
declare var AMap: any;

@Component({
    selector: 'app-map-base',
    templateUrl: './map-base.component.html',
    styleUrls: ['./map-base.component.scss'],
    providers: [MapServiceService, BaseService]
})
export class MapBaseComponent implements OnInit {

    // 地图对象
    map: any;

    // 地图加载控件对象
    mapLoad: any = {
        toolBar: {},
        scale: {},
        mapType: {},
        overView: {},
        line: {},
        gon: {},
        circle: {},
        rangingTool: {},
        mouseTool: []
    }
    // 地图加载控件是否显示标识
    mapModel: Object = {
        toolBar: true,
        scale: true,
        mapType: true,
        overView: true,
        toggleDrag: true,
        toggleKeyboard: true,
        toggleDoubleClickZoom: true,
        toggleIsHotspot: true,
        line: false,
        gon: false,
        circle: false,
        rangingTool: '',
        mouseTool: true
    }

    // 根据城市名称设置中心点
    locationCity: String = '';

    // 可获取数据的对象
    availableMapObject: Array<String> = ['line', 'gon', 'circle']
    // 可获取数据的对象获取的数据
    availableMapData: any;
    // 获取数据
    getMapData: Function = (type: String) => {
        this.availableMapData = {};
        this.availableMapObject.forEach(item => {
            if (typeof item == 'string' && typeof type == 'string') {
                if (item !== 'circle' && typeof this.mapLoad[item].object[type] == 'function') {
                    this.availableMapData[item] = this.mapLoad[item].object[type]();
                } else if (item == 'circle') {
                    if (!this.availableMapData.circle) {
                        this.availableMapData.circle = {};
                    }
                    this.availableMapData.circle.center = this.mapLoad.circle.object.getCenter();
                    this.availableMapData.circle.radius = this.mapLoad.circle.object.getRadius();
                }
                // if(this.mapLoad[item]) {
                //     this.map.setZoomAndCenter(this.zoomNum, [116.368904, 39.913423]);
                // }
            }
        })
    }

    // 距离测量
    choiceData: Array<Object> = [
        {
            name: '一种折线',
            code: 'line1'
        },
        {
            name: '另一种折线',
            code: 'line2'
        },
        {
            name: '点',
            code: 'marker',
            obj: {}
        },
        {
            name: '线',
            code: 'polyline',
            obj: {}
        },
        {
            name: '面',
            code: 'polygon',
            obj: {}
        },
        {
            name: '矩形',
            code: 'rectangle',
            obj: {}
        },
        {
            name: '圆',
            code: 'circle',
            obj: {}
        }
    ];
    choiceMapData: String = '';
    mapMouseToolObj: any;
    mapMouseToolDataObj: any;
    choiceLine: Function = () => {
        this.mapMouseToolObj.close();
        if (this.choiceMapData == 'line1') {
            this.mapLoad.rangingTool.ruler2.turnOff();
            this.mapLoad.rangingTool.ruler1.turnOn();
        } else if (this.choiceMapData == 'line2') {
            this.mapLoad.rangingTool.ruler1.turnOff();
            this.mapLoad.rangingTool.ruler2.turnOn();
        } else {
            this.mapLoad.rangingTool.ruler1.turnOff();
            this.mapLoad.rangingTool.ruler2.turnOff();
            if (this.choiceMapData == 'marker') {
                this.mapMouseToolObj.marker({ offset: new AMap.Pixel(-10, -34) });
            } else {
                if (typeof this.choiceMapData == 'string') {
                    this.mapMouseToolObj[this.choiceMapData]();
                }
            }
            AMap.event.addListener(this.mapMouseToolObj, 'draw', this.getpath)
        }
    }
    // 鼠标工具获取数据
    getpath: Function = (e) => {
        console.log(e.obj.getPath());
        // console.log(this.mapMouseToolDataObj.getPosition());
        // if(this.choiceMapData == 'line1') {
        //     console.log(this.mapLoad.rangingTool);
        // }e
        // console.log(this.mapMouseToolObj.getpath());
    }
    // rangingTool获取数据
    getRangingTool: Function = () => {
        console.log(this.mapLoad.rangingTool.ruler1);
        // 真的无法获取坐标
        // console.log(this.mapLoad.rangingTool.ruler1.lineOptions);
        // console.log(this.mapLoad.rangingTool.ruler1.startMarkerOptions);
        // console.log(this.mapLoad.rangingTool.ruler1.midMarkerOptions);
        // console.log(this.mapLoad.rangingTool.ruler1.endMarkerOptions);
        // console.log(this.mapLoad.rangingTool.ruler1.tmpLineOptions);
    }
    // 重新定位
    setCity: Function = () => {
        let city = this.locationCity;
        if (!this.locationCity) {
            city = '重庆';
        }
        this.map.setCity(city);
    }

    // 地图功能是否限制
    toggle: Function = function (type) {
        let setObject: Object = {};
        if (this[type]) {
            setObject[type] = true;
        } else {
            setObject[type] = false;
        }
        this.map.setStatus(setObject);
    }

    // 控件显示
    toggleShow: Function = function (type: string) {
        if (!this.mapModel[type]) {
            this.mapLoad[type].hide();
        } else {
            this.mapLoad[type].show();
        }
    }

    // 折线、多边形、圆是否可以编辑
    toggleEdit: Function = function (type: string) {
        if (!this.mapModel[type]) {
            this.mapLoad[type].editObject.close();
        } else {
            this.mapLoad[type].editObject.open();
        }
        debugger;
    }

    // 限制区域为当前视野
    setLimitBounds: Function = function () {
        this.map.setLimitBounds(this.map.getBounds());
    }

    // 获取限制区域坐标
    getLimitBounds: Function = function () {
        let limitBounds = this.map.getLimitBounds();

        if (limitBounds) {
            var tip = [];
            tip.push('限制区域：\n西南坐标[' + limitBounds.southwest.lng + ',' + limitBounds.southwest.lat + ']\n')
            tip.push('东北坐标[' + limitBounds.northeast.lng + ',' + limitBounds.northeast.lat + ']')
            alert(tip.join(''));
        } else {
            alert('未设置限制区域');
        }
    }

    // 清除区域限制
    clearLimitBounds: Function = function () {
        this.map.clearLimitBounds();
    }

    mapInformation: Object = {};
    // 默认获取当前视野的地址信息
    mapMoveend: Function = () => {
        this.map.on('moveend', this.getCity);
    }
    getCity: Function = () => {
        this.map.getCity((data) => {
            this.mapInformation = data;
            // if (data['province'] && typeof data['province'] === 'string') {
            //     document.getElementById('info').innerHTML = '城市：' + (data['city'] || data['province']);
            // }
        });
    }

    zoomNum: Number = 0;
    // 缩放级别
    defaultZoomend: Function = () => {
        AMap.event.addListener(this.map, 'zoomend', this.getZoom())
    }
    getZoom: Function = () => {
        this.zoomNum = this.map.getZoom();
    }
    testSubscribe: Function = () => {
        console.log(this.map);
    }
    constructor(private mapService: MapServiceService, private baseService: BaseService) { }

    polygonSetting: Object = {
        // path: arr,    //设置多边形轮廓的节点数组
        strokeColor: "#0000ff",
        strokeOpacity: 0.2,
        strokeWeight: 3,
        fillColor: "#f5deb3",
        fillOpacity: 0.35
    }

    polygonCircleSetting: Object = {
        // path: arr,    //设置多边形轮廓的节点数组
        radius: 1000,
        strokeColor: "#0000ff",
        strokeOpacity: 0.2,
        strokeWeight: 3,
        fillColor: "#f5deb3",
        fillOpacity: 0.35
    }
    ngOnInit() {
        // 创建地图对象
        this.map = this.mapService.createMap('gaodemap');
        // 加载工具条
        this.mapLoad.toolBar = this.mapService.setToolBar(this.map);
        // 加载比例尺
        this.mapLoad.scale = this.mapService.setScale(this.map);
        // 加载地图实景（含路况）
        this.mapLoad.mapType = this.mapService.setMapType(this.map);
        // 加载鹰眼
        this.mapLoad.overView = this.mapService.setOverView(this.map);
        // 自定义搜索功能
        this.mapService.defaultSearch(this.map, 'tipinput', '成都');
        // 绑定地图滑动
        this.mapMoveend();
        // 获取城市
        this.getCity();
        // 默认设置地图层级
        this.defaultZoomend();
        // 获取地图层级
        this.getZoom();
        // 折线展示
        let lineArr = [
            {
                lng: 116.368904,
                lat: 39.913423
            },
            {
                lng: 116.382122,
                lat: 39.901176
            }
        ]
        this.mapLoad.line = this.mapService.mapPolyShow(this.map, lineArr, this.polygonSetting, 'line');
        // 多边形展示
        let gonArr = [
            {
                lng: 116.403322,
                lat: 39.920255
            },
            {
                lng: 116.410703,
                lat: 39.897555
            },
            {
                lng: 116.402292,
                lat: 39.892353
            }
        ]
        this.mapLoad.gon = this.mapService.mapPolyShow(this.map, gonArr, this.polygonSetting, 'gon');
        //  圆展示
        let circlePoint = {
            lng: 116.403322,
            lat: 39.920255
        }
        this.mapLoad.circle = this.mapService.mapCircleShow(this.map, circlePoint, this.polygonCircleSetting);
        // 距离测量
        let lOptions: Object = {
            strokeStyle: "solid",
            strokeColor: "#FF33FF",
            strokeOpacity: 1,
            strokeWeight: 2
        }
        this.mapLoad.rangingTool = this.mapService.rangingTool(this.map, lOptions);
        // this.mapLoad.rangingTool.ruler2.turnOff();
        // this.mapLoad.rangingTool.ruler1.turnOn();
        // this.mouseTool.forEach(element => {
        //     this.mapService.mouseTool(this.map, this.mapCallBack[element.callBack], element.name);
        // });
        this.mapMouseToolObj = this.mapService.mapMouseTool(this.map);
    }
}
