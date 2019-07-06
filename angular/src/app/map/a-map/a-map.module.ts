import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AMapViewDirective } from './directive/a-map-view.directive';

@NgModule({
    declarations: [
        AMapViewDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AMapViewDirective
    ]
})
export class AMapModule { }
