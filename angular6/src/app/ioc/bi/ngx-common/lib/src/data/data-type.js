"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterData = /** @class */ (function () {
    function FilterData(columnName, filterType, values, id, title) {
        this.columnName = columnName;
        this.filterType = filterType;
        this.values = values;
        this.id = id;
        this.title = title;
    }
    return FilterData;
}());
exports.FilterData = FilterData;
var Dataset = /** @class */ (function () {
    function Dataset(name, categoryName) {
        this.name = name;
        this.categoryName = categoryName;
        this.query = {};
        this.data = {
            expressions: [],
            filters: [],
            schema: {
                dimension: [],
                measure: []
            }
        };
    }
    return Dataset;
}());
exports.Dataset = Dataset;

//# sourceMappingURL=../../sourcemaps/src/data/data-type.js.map
