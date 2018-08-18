export class FilterData {
    constructor(
        public columnName: string,
        public filterType: string,
        public values: Array<any>,
        public id?: string,
        public title?: string
    ) {}
}

export class Dataset {
    query: any = {};
    data: any = {
        expressions: [],
        filters: [],
        schema: {
            dimension: [],
            measure: []
        }
    };

    constructor(public name?: string, public categoryName?: string) {}
}