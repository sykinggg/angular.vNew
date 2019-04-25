import { Injectable } from '@angular/core';

import { ThreeBaseService, Css3DenderService, OrbitControlsService } from '../threeCommon';

@Injectable({
    providedIn: 'root'
})
export class Css3dOrthographicService {

    public three: any;

    constructor(
        public threeBaseService: ThreeBaseService,
        public css3DenderService: Css3DenderService,
        public orbitControlsService: OrbitControlsService
    ) {
        this.three = this.threeBaseService.getThreeObj();
        this.three = this.css3DenderService.defaultCss3Dender(this.three);
        this.three = this.orbitControlsService.defaultOrbitControls(this.three);
    }

    public init(threeContainerObj: any) {

        let frustumSize = 500;
        let aspect = window.innerWidth / window.innerHeight;
        this.three.camera = new this.three.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);

        this.three.camera.position.set(- 200, 200, 200);

        let controls = new this.three.OrbitControls(this.three.camera);

        this.three.scene = new this.three.Scene();
        this.three.scene.background = new this.three.Color(0xf0f0f0);

        this.three.scene2 = new this.three.Scene();

        this.three.material = new this.three.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: this.three.DoubleSide });

        // left
        const createPlane_left_vector = new this.three.Vector3(- 50, 0, 0);
        const createPlane_left_euler = new this.three.Euler(0, - 90 * this.three.Math.DEG2RAD, 0);
        this.createPlane(
            100, 100,
            'chocolate',
            createPlane_left_vector,
            createPlane_left_euler
        );

        // right
        const createPlane_right_vector = new this.three.Vector3(0, 0, 50);
        const createPlane_right_euler = new this.three.Euler(0, 0, 0);
        this.createPlane(
            100, 100,
            'saddlebrown',
            createPlane_right_vector,
            createPlane_right_euler
        );

        // top
        const createPlane_top_vector = new this.three.Vector3(0, 50, 0);
        const createPlane_top_euler = new this.three.Euler(- 90 * this.three.Math.DEG2RAD, 0, 0);
        this.createPlane(
            100, 100,
            'yellowgreen',
            createPlane_top_vector,
            createPlane_top_euler
        );

        // bottom
        const createPlane_bottom_vector = new this.three.Vector3(0, - 50, 0);
        const createPlane_bottom_euler = new this.three.Euler(- 90 * this.three.Math.DEG2RAD, 0, 0);
        this.createPlane(
            300, 300,
            'seagreen',
            createPlane_bottom_vector,
            createPlane_bottom_euler
        );

        this.three.renderer = new this.three.WebGLRenderer();
        this.three.renderer.setPixelRatio(window.devicePixelRatio);
        this.three.renderer.setSize(threeContainerObj.width, threeContainerObj.height);
        // document.body.appendChild(this.three.renderer.domElement);
        threeContainerObj.elem.appendChild(this.three.renderer.domElement);

        this.three.renderer2 = new this.three.CSS3DRenderer();
        // this.three.renderer2.setSize(window.innerWidth, window.innerHeight);
        this.three.renderer2.setSize(threeContainerObj.width, threeContainerObj.height);
        this.three.renderer2.domElement.style.position = 'absolute';
        this.three.renderer2.domElement.style.bottom = '22px';
        // this.three.renderer2.domElement.style.bottom = '0px';
        // document.body.appendChild(this.three.renderer2.domElement);
        threeContainerObj.elem.appendChild(this.three.renderer2.domElement);

    }

    public animate() {

        window['requestAnimFrame'](this.animate.bind(this));

        this.three.renderer.render(this.three.scene, this.three.camera);
        this.three.renderer2.render(this.three.scene2, this.three.camera);

    }

    private createPlane(width, height, cssColor, pos, rot) {

        let element = document.createElement('div');
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        element.style.opacity = '0.75';
        element.style.background = cssColor;

        let object = new this.three.CSS3DObject(element);
        object.position.copy(pos);
        object.rotation.copy(rot);
        this.three.scene2.add(object);

        let geometry = new this.three.PlaneBufferGeometry(width, height);
        let mesh = new this.three.Mesh(geometry, this.three.material);
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        // mesh.position.x = mesh.position.x - 60;
        this.three.scene.add(mesh);

    }
}
