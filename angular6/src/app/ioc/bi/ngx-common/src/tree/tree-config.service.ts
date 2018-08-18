import { Injectable, Optional } from '@angular/core';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';

import { ApiServer, DialogService } from 'core-services/core';
import { REQUEST_OPTIONS } from 'app/pack/common/src/index';
import { TreeConfig } from './tree-config';

@Injectable({
    providedIn: 'root',
})

export class TreeConfigService {
    private config;

    constructor(
        private dataServer: ApiServer,
        private dialogService: DialogService,
        @Optional() config: TreeConfig
    ) {
        if (config) {
            this.config = config;
        }
    }

    buildTree(list: Array<any>, root?: any): Array<any> {
        let listOut = [{
            id: 'root',
            name: 'Root',
            isExpanded: true,
            children: []
        }];
        let node: any;

        if (root) {
            listOut[0] = root;
        }
        node = listOut[0];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let attrs = item.categoryName ? item.categoryName.split('/') : [];

            attrs.forEach((name: string, index: number) => {
                node = this.getRoot(node, attrs.slice(0, index + 1).join('/'), name);
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
        }

        return listOut;
    }

    searchNode(datasourceList: Array<any>, datasetList: Array<any>, keywords: string, tree: TreeComponent) {
        if (!datasetList || !datasetList.length) {
            return;
        }
        let para = {
            dsName: '',
            dsrName: ''
        };
        let originalData: Array<any>;
        // map datasetList to list (add datasourceName)
        let list = datasetList.map((ds: any) => {
            let dsr = datasourceList && datasourceList.filter((obj: any) => {
                return obj.id === ds.data.datasource
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
            } else {
                let keys = keywords.split(' ');

                for (let i = 0; i < keys.length; i++) {
                    let w = keys[i].trim();

                    if (w.split(':')[0] === 'ds') {
                        para['dsName'] = w.split(':')[1];
                    }
                    if (w.split(':')[0] === 'dsr') {
                        para['dsrName'] = w.split(':')[1];
                    }
                }
            }
            // filter data by keywords
            originalData = this.buildTree(list.filter((item: any) => {
                return item.name.indexOf(para.dsName) > -1 && item.datasourceName.indexOf(para.dsrName) > -1;
            }));
        } else {
            originalData = this.buildTree(list);
        }

        if (tree) {
            tree.treeModel.nodes = originalData;
            tree.treeModel.update();
            setTimeout(function() {
                tree.treeModel.expandAll();
            }, 500);
        }
    }

    checkTreeNode(actionType: string, tree: TreeComponent): boolean {
        let selectedNodes = tree.treeModel.getActiveNodes();

        if (selectedNodes.length === 0) {
            this.dialogService.confirm('Please, select one widget first!', 'prompt');

            return false;
        } else if (typeof(selectedNodes[0].children) !== 'undefined') {
            this.dialogService.confirm('Can\'t ' + actionType + ' a folder!', 'prompt');

            return false;
        } else {
            return true;
        }
    }

    moveNode(event: any, tree: TreeComponent, options: any) {
        let owner = this;

        let updateItem = function(nodeid, newCategory) {
            let item = options.list.filter((item: any) => {
                return item.id === nodeid;
            })[0];

            item.categoryName = newCategory;
            owner.dataServer.post(options.updateUrl, {
                json: JSON.stringify(item)
            }, REQUEST_OPTIONS).subscribe((data: any) => {
                if (data.status === '1') {
                    // console.log('success!');
                } else {
                    owner.dialogService.confirm(data.msg, 'COMMON.TIP');
                }
            });
        };

        let updateNode = function (node, tarPath) {
            let children = node.children;

            if (!children || children.length === 0) {
                updateItem(node.id, tarPath);
            } else {
                let newTarPath = tarPath === '' ? node.name : tarPath + '/' + node.name;

                for (let i = 0; i < children.length; i++) {
                    let child = children[i];

                    updateNode(child, newTarPath);
                }
            }
        };

        updateNode(event.node, this.getNodePath(event.to.parent));
    }

    getNodePath(node: any): string {
        let path = node.name;

        if (node.parent) {
            path = this.getNodePath(node.parent) + path;
        }

        return path
    }

    getRoot(root: any, id: string, name: string): any {
        let node = null;

        if (root.children) {
            for (let i = 0; i < root.children.length; i++) {
                let item = root.children[i];

                if (item.id === id) {
                    node = item;
                    break;
                }
            }
        } else {
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
    }
}