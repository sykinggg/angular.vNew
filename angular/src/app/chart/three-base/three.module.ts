import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeDirective } from './three.directive';
import { ThreeCss3dOrthographiComponent } from './three-css3d-orthographi/three-css3d-orthographi.component';
import { ThreeContainerComponent } from './three-container/three-container.component';
import { ThreeCss3dPanoramaComponent } from './three-css3d-panorama/three-css3d-panorama.component';
import { ThreeCss3dPeriodictableComponent } from './three-css3d-periodictable/three-css3d-periodictable.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ThreeDirective,
        ThreeContainerComponent,
        ThreeCss3dOrthographiComponent,
        ThreeCss3dPanoramaComponent,
        ThreeCss3dPeriodictableComponent,
    ],
    entryComponents: [
        ThreeCss3dOrthographiComponent,
        ThreeCss3dPanoramaComponent,
        ThreeCss3dPeriodictableComponent,
    ],
    exports: [
        ThreeContainerComponent,
    ],
})
export class ThreeModule { }
