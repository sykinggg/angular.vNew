import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ParamComponent } from './param.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ParamComponent
    ],
    entryComponents: [ParamComponent],
    exports: [ParamComponent],
    providers: []
})

export class ParamModule {

}
