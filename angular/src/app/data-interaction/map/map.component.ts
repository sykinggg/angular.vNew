import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    private apiUrl = 'http://127.0.0.1:666/map/';

    constructor(
        private http: HttpClient,
        private message: NzMessageService
    ) { }

    ngOnInit() {
    }

    // 地理编码
    reverseGeocodingData;
    reverseGeocoding() {
        this.http.post(this.apiUrl + 'reverseGeocoding', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.reverseGeocodingData = res;
            }
        })
    }
    // 逆地理编码
    reverseRegeocodingData;
    reverseRegeocoding() {
        this.http.post(this.apiUrl + 'reverseRegeocoding', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.reverseRegeocodingData = res;
            }
        })
    }
    // 步行路径规划
    directionWalkingData;
    directionWalking() {
        this.http.post(this.apiUrl + 'directionWalking', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.directionWalkingData = res;
            }
        })
    }
    // 公交路径规划
    directionTransitIntegratedData;
    directionTransitIntegrated() {
        this.http.post(this.apiUrl + 'directionTransitIntegrated', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.directionTransitIntegratedData = res;
            }
        })
    }
    // 驾车路径规划
    directionDrivingData;
    directionDriving() {
        this.http.post(this.apiUrl + 'directionDriving', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.directionDrivingData = res;
            }
        })
    }
    // 骑行路径规划
    directionBicyclingData;
    directionBicycling() {
        this.http.post(this.apiUrl + 'directionBicycling', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.directionBicyclingData = res;
            }
        })
    }
    // 货车路径规划
    directionTruckData;
    directionTruck() {
        this.http.post(this.apiUrl + 'directionTruck', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.directionTruckData = res;
            }
        })
    }
    // 距离测量
    distanceData;
    distance() {
        this.http.post(this.apiUrl + 'distance', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.distanceData = res;
            }
        })
    }
    // 行政区域查询
    configDistrictData;
    configDistrict() {
        this.http.post(this.apiUrl + 'configDistrict', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.configDistrictData = res;
            }
        })
    }
    // 关键字搜索
    placeTextData;
    placeText() {
        this.http.post(this.apiUrl + 'placeText', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.placeTextData = res;
            }
        })
    }
    // 周边搜索
    placeAroundData;
    placeAround() {
        this.http.post(this.apiUrl + 'placeAround', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.placeAroundData = res;
            }
        })
    }
    // 多边形搜索
    placePolygonData;
    placePolygon() {
        this.http.post(this.apiUrl + 'placePolygon', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.placePolygonData = res;
            }
        })
    }
    // ID查询
    placeDetailData;
    placeDetail() {
        this.http.post(this.apiUrl + 'placeDetail', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.placeDetailData = res;
            }
        })
    }
    // IP定位
    v3IpData;
    v3Ip() {
        this.http.post(this.apiUrl + 'v3Ip', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.v3IpData = res;
            }
        })
    }
    // 静态地图
    v3StaticmapUrl;
    v3Staticmap() {
        this.http.post(this.apiUrl + 'v3Staticmap', null).subscribe(res => {
            this.v3StaticmapUrl = res;
            console.log(res);
        })
    }
    // 坐标转换
    coordinateConvertData;
    coordinateConvert() {
        this.http.post(this.apiUrl + 'coordinateConvert', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.coordinateConvertData = res;
            }
        })
    }
    // 天气查询
    weatherWeatherInfoData;
    weatherWeatherInfo() {
        this.http.post(this.apiUrl + 'weatherWeatherInfo', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.weatherWeatherInfoData = res;
            }
        })
    }
    // 输入提示
    assistantInputtipsData;
    assistantInputtips() {
        this.http.post(this.apiUrl + 'assistantInputtips', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.assistantInputtipsData = res;
            }
        })
    }
    // 支持交通态势的城市列表
    getStatusRectangleListData;
    getStatusRectangleList() {
        this.http.get(this.apiUrl + 'getStatusRectangleList').subscribe(res => {
            console.log(res);
            if (res) {
                this.getStatusRectangleListData = res;
            }
        })
    }
    // 矩形区域交通态势
    statusRectangleData;
    statusRectangle() {
        this.http.post(this.apiUrl + 'statusRectangle', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.statusRectangleData = res;
            }
        })
    }
    // 圆形区域交通态势
    statusCircleData;
    statusCircle() {
        this.http.post(this.apiUrl + 'statusCircle', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.statusCircleData = res;
            }
        })
    }
    // 指定线路交通态势
    statusRoadData;
    statusRoad() {
        this.http.post(this.apiUrl + 'statusRoad', null).subscribe(res => {
            console.log(res);
            if (res) {
                this.statusRoadData = res;
            }
        })
    }
    // 轨迹纠偏
    grasproadDriving() {
        this.http.post(this.apiUrl + 'grasproadDriving', null).subscribe(res => {
            console.log(res);
        })
    }
}
