"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var input_1 = require("./input");
var Checkbox = /** @class */ (function (_super) {
    tslib_1.__extends(Checkbox, _super);
    function Checkbox(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'radio';
        _this.checked = false;
        _this.checked = options.checked;
        return _this;
    }
    return Checkbox;
}(input_1.Input));
exports.Checkbox = Checkbox;

//# sourceMappingURL=../../sourcemaps/src/input/checkbox.js.map
