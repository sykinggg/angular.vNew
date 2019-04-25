import { Injectable } from '@angular/core';
import { ThreeBaseService, Css3DenderService } from '../threeCommon';

@Injectable({
    providedIn: 'root'
})
export class Css3dPanoramaService {

    public three: any;

    public threeContainerObj: any;

    constructor(
        public threeBaseService: ThreeBaseService,
        public css3DenderService: Css3DenderService,
    ) {
        this.three = this.threeBaseService.getThreeObj();
        this.three = this.css3DenderService.defaultCss3Dender(this.three);

        this.three.lon = 90;
        this.three.lat = 0;
        this.three.phi = 0;
        this.three.theta = 0;
    }

    public init(threeContainerObj: any) {
        this.threeContainerObj = threeContainerObj;
        this.three.camera = new this.three.PerspectiveCamera(75, (threeContainerObj.width || window.innerWidth) / (threeContainerObj.height || window.innerHeight), 1, 1000);

        this.three.scene = new this.three.Scene();

        let sides = [
            {
                url: 'assets/bridge2/posx.jpg',
                position: [- 512, 0, 0],
                rotation: [0, Math.PI / 2, 0]
            },
            {
                url: 'assets/bridge2/negx.jpg',
                position: [512, 0, 0],
                rotation: [0, - Math.PI / 2, 0]
            },
            {
                url: 'assets/bridge2/posy.jpg',
                position: [0, 512, 0],
                rotation: [Math.PI / 2, 0, Math.PI]
            },
            {
                url: 'assets/bridge2/negy.jpg',
                position: [0, - 512, 0],
                rotation: [- Math.PI / 2, 0, Math.PI]
            },
            {
                url: 'assets/bridge2/posz.jpg',
                position: [0, 0, 512],
                rotation: [0, Math.PI, 0]
            },
            {
                url: 'assets/bridge2/negz.jpg',
                position: [0, 0, - 512],
                rotation: [0, 0, 0]
            }
        ];

        for (let i = 0; i < sides.length; i++) {

            let side = sides[i];

            let element = document.createElement('img');
            element.width = 1026; // 2 pixels extra to close the gap.
            element.src = side.url;
            element['ngSrc'] = side.url;

            let object = new this.three.CSS3DObject(element);
            object.position.fromArray(side.position);
            object.rotation.fromArray(side.rotation);
            this.three.scene.add(object);

        }

        this.three.renderer = new this.three.CSS3DRenderer();
        this.three.renderer.setSize(threeContainerObj.width, threeContainerObj.height);
        // threeContainerObj.elem.body.appendChild(this.three.renderer.domElement);
        threeContainerObj.elem.appendChild(this.three.renderer.domElement);

        threeContainerObj.elem.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
        threeContainerObj.elem.addEventListener('wheel', this.onDocumentMouseWheel.bind(this), false);
        threeContainerObj.elem.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        threeContainerObj.elem.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);

        threeContainerObj.elem.addEventListener('touchstart', this.onDocumentTouchStart.bind(this), false);
        threeContainerObj.elem.addEventListener('touchmove', this.onDocumentTouchMove.bind(this), false);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    public onWindowResize() {

        this.three.camera.aspect = (this.threeContainerObj.width || window.innerWidth) / (this.threeContainerObj.height || window.innerHeight);
        this.three.camera.updateProjectionMatrix();

        this.three.renderer.setSize((this.threeContainerObj.width || window.innerWidth), (this.threeContainerObj.height || window.innerHeight));

    }

    public type;
    public onDocumentMouseDown(event) {
        this.type = 'onDocumentMouseDown';
        event.preventDefault();

    }

    public onDocumentMouseMove(event) {

        if (this.type === 'onDocumentMouseDown') {
            let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            this.three.lon -= movementX * 0.1;
            this.three.lat += movementY * 0.1;
        }

    }

    public onDocumentMouseUp() {

        this.type = 'onDocumentMouseUp';

        console.log('onDocumentMouseUp');

        // this.threeContainerObj.elem.removeEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        // this.threeContainerObj.elem.removeEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);

    }

    public onDocumentMouseWheel(event) {

        let fov = this.three.camera.fov + event.deltaY * 0.05;

        this.three.camera.fov = this.three.Math.clamp(fov, 10, 75);

        this.three.camera.updateProjectionMatrix();

    }

    public onDocumentTouchStart(event) {

        event.preventDefault();

        let touch = event.touches[0];

        this.three.touchX = touch.screenX;
        this.three.touchY = touch.screenY;

    }

    public onDocumentTouchMove(event) {

        event.preventDefault();

        let touch = event.touches[0];

        this.three.lon -= (touch.screenX - this.three.touchX) * 0.1;
        this.three.lat += (touch.screenY - this.three.touchY) * 0.1;

        this.three.touchX = touch.screenX;
        this.three.touchY = touch.screenY;

    }

    public animate() {

        window['requestAnimFrame'](this.animate.bind(this));

        this.three.lon += 0.1;
        this.three.lat = Math.max(- 85, Math.min(85, this.three.lat));
        this.three.phi = this.three.Math.degToRad(90 - this.three.lat);
        this.three.theta = this.three.Math.degToRad(this.three.lon);

        if (!this.three.target) {
            this.three.target = new this.three.Vector3();
        }
        this.three.target.x = Math.sin(this.three.phi) * Math.cos(this.three.theta);
        this.three.target.y = Math.cos(this.three.phi);
        this.three.target.z = Math.sin(this.three.phi) * Math.sin(this.three.theta);

        this.three.camera.lookAt(this.three.target);

        this.three.renderer.render(this.three.scene, this.three.camera);

    }
}
