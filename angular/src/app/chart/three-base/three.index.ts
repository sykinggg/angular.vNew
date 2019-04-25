import { ThreeCss3dOrthographiComponent } from './three-css3d-orthographi/three-css3d-orthographi.component';
import { ThreeCss3dPanoramaComponent } from './three-css3d-panorama/three-css3d-panorama.component';
import { ThreeCss3dPeriodictableComponent } from './three-css3d-periodictable/three-css3d-periodictable.component';

export interface IThreeDynamicComponent {
    outsideData: any;
}

export const ThreeDynamicComponent = {
    css3dOrthographi: ThreeCss3dOrthographiComponent,
    css3dPanorama: ThreeCss3dPanoramaComponent,
    css3dPeriodictable: ThreeCss3dPeriodictableComponent,
}
