import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormControlService } from './form-control.service';
import { InputComponent } from './input.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
    declarations: [InputComponent],
    exports: [FormsModule, ReactiveFormsModule, InputComponent],
    providers: [FormControlService]
})

export class InputModule {
    constructor(@Optional() @SkipSelf() parentModule: InputModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: InputModule
        };
    }
}
