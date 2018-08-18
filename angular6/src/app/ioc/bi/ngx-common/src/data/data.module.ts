import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DataService } from './data.service';
import { UpdateService } from './update.service';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [DataService, UpdateService]
})

export class DataModule {
    constructor(@Optional() @SkipSelf() parentModule: DataModule) {
        if (parentModule) {
            throw new Error('DataModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DataModule
        };
    }
}