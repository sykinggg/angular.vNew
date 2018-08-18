import { TreeComponent } from 'angular-tree-component';
import { ApiServer, DialogService } from 'core-services/core';
import { TreeConfig } from './tree-config';
export declare class TreeConfigService {
    private dataServer;
    private dialogService;
    private config;
    constructor(dataServer: ApiServer, dialogService: DialogService, config: TreeConfig);
    buildTree(list: Array<any>, root?: any): Array<any>;
    searchNode(datasourceList: Array<any>, datasetList: Array<any>, keywords: string, tree: TreeComponent): void;
    checkTreeNode(actionType: string, tree: TreeComponent): boolean;
    moveNode(event: any, tree: TreeComponent, options: any): void;
    getNodePath(node: any): string;
    getRoot(root: any, id: string, name: string): any;
}
