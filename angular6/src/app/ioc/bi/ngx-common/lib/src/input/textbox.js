"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Input_1 = require("./Input");
var TextboxQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(TextboxQuestion, _super);
    function TextboxQuestion(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'text';
        _this.type = options['type'] || '';
        return _this;
    }
    return TextboxQuestion;
}(Input_1.Input));
exports.TextboxQuestion = TextboxQuestion;

//# sourceMappingURL=../../sourcemaps/src/input/textbox.js.map
