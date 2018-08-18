import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { InformationComponent } from './information.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        InformationComponent
    ],
    entryComponents: [InformationComponent],
    exports: [InformationComponent],
    providers: []
})

export class InformationModule {

}
