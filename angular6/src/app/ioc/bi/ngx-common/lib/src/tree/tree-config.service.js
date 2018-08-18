"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var core_2 = require("core-services/core");
var index_1 = require("app/pack/common/src/index");
var tree_config_1 = require("./tree-config");
var TreeConfigService = /** @class */ (function () {
    function TreeConfigService(dataServer, dialogService, config) {
        this.dataServer = dataServer;
        this.dialogService = dialogService;
        if (config) {
            this.config = config;
        }
    }
    TreeConfigService.prototype.buildTree = function (list, root) {
        var _this = this;
        var listOut = [{
                id: 'root',
                name: 'Root',
                isExpanded: true,
                children: []
            }];
        var node;
        if (root) {
            listOut[0] = root;
        }
        node = listOut[0];
        var _loop_1 = function (i) {
            var item = list[i];
            var attrs = item.categoryName ? item.categoryName.split('/') : [];
            attrs.forEach(function (name, index) {
                node = _this.getRoot(node, attrs.slice(0, index + 1).join('/'), name);
            });
            if (!node.children) {
                node.children = [];
            }
            node.children.push({
                id: item.id,
                name: item.name || 'N/A',
                alias: item.name
            });
            node = listOut[0];
        };
        for (var i = 0; i < list.length; i++) {
            _loop_1(i);
        }
        return listOut;
    };
    TreeConfigService.prototype.searchNode = function (datasourceList, datasetList, keywords, tree) {
        if (!datasetList || !datasetList.length) {
            return;
        }
        var para = {
            dsName: '',
            dsrName: ''
        };
        var originalData;
        // map datasetList to list (add datasourceName)
        var list = datasetList.map(function (ds) {
            var dsr = datasourceList && datasourceList.filter(function (obj) {
                return obj.id === ds.data.datasource;
            })[0];
            return {
                id: ds.id,
                name: ds.name,
                categoryName: ds.categoryName,
                datasourceName: dsr ? dsr.name : ''
            };
        });
        // split search keywords
        if (keywords) {
            if (keywords.indexOf(' ') === -1 && keywords.indexOf(':') === -1) {
                para.dsName = keywords;
            }
            else {
                var keys = keywords.split(' ');
                for (var i = 0; i < keys.length; i++) {
                    var w = keys[i].trim();
                    if (w.split(':')[0] === 'ds') {
                        para['dsName'] = w.split(':')[1];
                    }
                    if (w.split(':')[0] === 'dsr') {
                        para['dsrName'] = w.split(':')[1];
                    }
                }
            }
            // filter data by keywords
            originalData = this.buildTree(list.filter(function (item) {
                return item.name.indexOf(para.dsName) > -1 && item.datasourceName.indexOf(para.dsrName) > -1;
            }));
        }
        else {
            originalData = this.buildTree(list);
        }
        if (tree) {
            tree.treeModel.nodes = originalData;
            tree.treeModel.update();
            setTimeout(function () {
                tree.treeModel.expandAll();
            }, 500);
        }
    };
    TreeConfigService.prototype.checkTreeNode = function (actionType, tree) {
        var selectedNodes = tree.treeModel.getActiveNodes();
        if (selectedNodes.length === 0) {
            this.dialogService.confirm('Please, select one widget first!', 'prompt');
            return false;
        }
        else if (typeof (selectedNodes[0].children) !== 'undefined') {
            this.dialogService.confirm('Can\'t ' + actionType + ' a folder!', 'prompt');
            return false;
        }
        else {
            return true;
        }
    };
    TreeConfigService.prototype.moveNode = function (event, tree, options) {
        var owner = this;
        var updateItem = function (nodeid, newCategory) {
            var item = options.list.filter(function (item) {
                return item.id === nodeid;
            })[0];
            item.categoryName = newCategory;
            owner.dataServer.post(options.updateUrl, {
                json: JSON.stringify(item)
            }, index_1.REQUEST_OPTIONS).subscribe(function (data) {
                if (data.status === '1') {
                    // console.log('success!');
                }
                else {
                    owner.dialogService.confirm(data.msg, 'COMMON.TIP');
                }
            });
        };
        var updateNode = function (node, tarPath) {
            var children = node.children;
            if (!children || children.length === 0) {
                updateItem(node.id, tarPath);
            }
            else {
                var newTarPath = tarPath === '' ? node.name : tarPath + '/' + node.name;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    updateNode(child, newTarPath);
                }
            }
        };
        updateNode(event.node, this.getNodePath(event.to.parent));
    };
    TreeConfigService.prototype.getNodePath = function (node) {
        var path = node.name;
        if (node.parent) {
            path = this.getNodePath(node.parent) + path;
        }
        return path;
    };
    TreeConfigService.prototype.getRoot = function (root, id, name) {
        var node = null;
        if (root.children) {
            for (var i = 0; i < root.children.length; i++) {
                var item = root.children[i];
                if (item.id === id) {
                    node = item;
                    break;
                }
            }
        }
        else {
            root.children = [];
        }
        if (node === null) {
            node = {
                id: id,
                name: name,
                isExpanded: true,
                children: []
            };
            root.children.push(node);
        }
        return node;
    };
    TreeConfigService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        tslib_1.__param(2, core_1.Optional()),
        tslib_1.__metadata("design:paramtypes", [core_2.ApiServer,
            core_2.DialogService,
            tree_config_1.TreeConfig])
    ], TreeConfigService);
    return TreeConfigService;
}());
exports.TreeConfigService = TreeConfigService;

//# sourceMappingURL=../../sourcemaps/src/tree/tree-config.service.js.map
