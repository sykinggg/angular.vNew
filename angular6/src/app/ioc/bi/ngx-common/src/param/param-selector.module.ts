import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ParamSelectorComponent } from './param-selector.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ParamSelectorComponent
    ],
    entryComponents: [ParamSelectorComponent],
    exports: [ParamSelectorComponent],
    providers: []
})

export class ParamSelectorModule {

}
