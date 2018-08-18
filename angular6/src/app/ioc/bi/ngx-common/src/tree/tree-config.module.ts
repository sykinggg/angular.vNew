import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeConfigService } from './tree-config.service';
import { TreeConfig } from './tree-config';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [TreeConfigService]
})

export class TreeConfigModule {
    constructor(@Optional() @SkipSelf() parentModule: TreeConfigModule) {
        if (parentModule) {
            throw new Error('TreeConfigModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(config: TreeConfig): ModuleWithProviders {
        return {
            ngModule: TreeConfigModule,
            providers: [{
                provide: TreeConfig,
                useValue: config
            }]
        };
    }
}