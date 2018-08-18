import { ThreeLevelMapService } from '../common/threeLevelMap.Service';
export declare class CBoardMapRenderService {
    private threeLevelMap;
    constructor(threeLevelMap: ThreeLevelMapService);
    options: any;
    tall: any;
    jqContainer: any;
    drill: any;
    container: any;
    CBoardMapRender(jqContainer: any, options: any, drill: any): this;
    do(tall: any, persist?: any): (o: any) => void;
}
