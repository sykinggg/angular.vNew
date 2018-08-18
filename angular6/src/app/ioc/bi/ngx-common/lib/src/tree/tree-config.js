"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeConfig = /** @class */ (function () {
    function TreeConfig() {
        this.isExpandedField = 'expanded';
        this.useCheckbox = false;
    }
    TreeConfig.prototype.allowDrag = function (node) {
        return node.isLeaf;
    };
    ;
    TreeConfig.prototype.allowDrop = function (node, to) {
        return to.parent.data.children;
    };
    ;
    return TreeConfig;
}());
exports.TreeConfig = TreeConfig;

//# sourceMappingURL=../../sourcemaps/src/tree/tree-config.js.map
