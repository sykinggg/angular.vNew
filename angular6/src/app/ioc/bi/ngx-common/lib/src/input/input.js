"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input = /** @class */ (function () {
    function Input(options) {
        if (options === void 0) { options = {}; }
        this.name = options.name || '';
        this.label = options.label || '';
        this.type = options.type || '';
        this.value = options.value;
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
    }
    return Input;
}());
exports.Input = Input;

//# sourceMappingURL=../../sourcemaps/src/input/input.js.map
