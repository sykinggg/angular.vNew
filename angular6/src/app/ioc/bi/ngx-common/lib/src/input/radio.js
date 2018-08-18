"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var input_1 = require("./input");
var Radio = /** @class */ (function (_super) {
    tslib_1.__extends(Radio, _super);
    function Radio(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'radio';
        _this.checked = false;
        _this.checked = options.checked;
        return _this;
    }
    return Radio;
}(input_1.Input));
exports.Radio = Radio;

//# sourceMappingURL=../../sourcemaps/src/input/radio.js.map
