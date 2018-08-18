export declare class ThreeLevelMapService {
    tipHeader: any;
    drillData: any[];
    provinceData: {};
    mapData: any;
    constructor();
    getZoomScale(features: any, width: any, height: any): number;
    getCenters(features: any): number[];
    fillColor(data: any, name: any): any;
    tipData(data: any, name: any): any;
    colorRange(args: any): void;
    backToTop(svg: any, width: any): void;
    map(options: any): void;
    clickMap(argsProvince: any): void;
    drawPrivenceMap(argsProvince: any): void;
    clickProvince(argsCountry: any): void;
    backColor: any;
    drawCountyMap(argsCountry: any): void;
    getRenderOption(option: any, drillConfig: any): void;
    drawBubble(data: any, svg: any, root: any, projection: any): void;
}
