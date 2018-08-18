import { ITreeOptions } from 'angular-tree-component';
export declare class TreeConfig implements ITreeOptions {
    isExpandedField: string;
    actionMapping: any;
    allowDrag(node: any): any;
    allowDrop(node: any, to: any): any;
    useCheckbox: boolean;
}
