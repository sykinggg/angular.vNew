export declare class FilterData {
    columnName: string;
    filterType: string;
    values: Array<any>;
    id?: string;
    title?: string;
    constructor(columnName: string, filterType: string, values: Array<any>, id?: string, title?: string);
}
export declare class Dataset {
    name?: string;
    categoryName?: string;
    query: any;
    data: any;
    constructor(name?: string, categoryName?: string);
}
