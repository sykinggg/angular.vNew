export declare class Render {
    container: any;
    ecc: any;
    isDeppSpec: any;
    options: any;
    theme: string;
    constructor(jqContainer: any, options: any, isDeepSpec?: any);
    chart(group: any, persist: any): (o: any) => void;
    changeSize(instance: any): void;
    addClick(chartConfig: any, relations: any, $state: any): void;
}
