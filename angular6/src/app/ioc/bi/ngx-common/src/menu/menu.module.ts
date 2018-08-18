import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [MenuService]
})

export class MenuModule {
    constructor(@Optional() @SkipSelf() parentModule: MenuModule) {
        if (parentModule) {
            throw new Error('MenuModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MenuModule
        };
    }
}