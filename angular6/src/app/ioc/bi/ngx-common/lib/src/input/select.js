"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var input_1 = require("./input");
var Select = /** @class */ (function (_super) {
    tslib_1.__extends(Select, _super);
    function Select(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'select';
        _this.options = [];
        _this.options = options['options'] || [];
        return _this;
    }
    return Select;
}(input_1.Input));
exports.Select = Select;

//# sourceMappingURL=../../sourcemaps/src/input/select.js.map
