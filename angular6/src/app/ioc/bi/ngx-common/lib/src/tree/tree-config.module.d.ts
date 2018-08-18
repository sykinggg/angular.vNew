import { ModuleWithProviders } from '@angular/core';
import { TreeConfig } from './tree-config';
export declare class TreeConfigModule {
    constructor(parentModule: TreeConfigModule);
    static forRoot(config: TreeConfig): ModuleWithProviders;
}
