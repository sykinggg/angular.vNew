import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line/line.component';
import { D3Component } from './d3/d3.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LineComponent,
        D3Component,
    ],
    entryComponents: [
        LineComponent,
        D3Component
    ],
})
export class D3Module { }

// ng g c chart/chart-container/d3/line --module d3.module
