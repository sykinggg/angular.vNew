import { Injectable } from '@angular/core';

import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class ThreeServiceService {

    public three: any = THREE;

    constructor() {

        // 浏览器兼容
        window['requestAnimFrame'] = function () {
            return (
                window['requestAnimationFrame'] ||
                window['webkitRequestAnimationFrame'] ||
                window['mozRequestAnimationFrame'] ||
                window['oRequestAnimationFrame'] ||
                window['msRequestAnimationFrame'] ||
                function (/* function */ callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        }();
    }

    // 创建box
    public createBox() {
        this.three.geometry = new this.three.BoxGeometry(1, 1, 1);
        this.three.material = new this.three.MeshBasicMaterial({ color: 0x00ff00 });
        this.three.cube = new this.three.Mesh(this.three.geometry, this.three.material);
        this.three.scene.add(this.three.cube);

        this.three.camera.position.z = 5;
        // camera.position.x = 0; // 设置相机的位置坐标
        // camera.position.y = 50; // 设置相机的位置坐标
        // camera.position.z = 100; // 设置相机的位置坐标
        // camera.up.x = 0; // 设置相机的上为「x」轴方向
        // camera.up.y = 1; // 设置相机的上为「y」轴方向
        // camera.up.z = 0; // 设置相机的上为「z」轴方向
        // camera.lookAt({ x: 0, y: 0, z: 0 }); // 设置视野的中心坐标
    }

    // 初始化场景
    public defaultBase(threeContainer?) {
        this.three.scene = new this.three.Scene();

        this.three.renderer = new this.three.WebGLRenderer();
        this.three.renderer.setSize(threeContainer.width, threeContainer.height);
        // const threeContainer = document.getElementsByClassName('threeContainer')[0];
        threeContainer.elem.appendChild(this.three.renderer.domElement);
    }

    public onWindowResize() {
        this.three.windowHalfX = window.innerWidth / 2;
        this.three.windowHalfY = window.innerHeight / 2;
        this.three.camera.aspect = window.innerWidth / window.innerHeight;
        this.three.camera.updateProjectionMatrix();
        this.three.effect.setSize(window.innerWidth, window.innerHeight);
    }

    public onDocumentMouseMove(event) {
        this.three.mouseX = (event.clientX - this.three.windowHalfX) * 10;
        this.three.mouseY = (event.clientY - this.three.windowHalfY) * 10;
    }

    public defaultCamera() {
        this.three.camera = new this.three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        let timer = 0.0001 * Date.now();
        this.three.camera.position.x += (this.three.mouseX - this.three.camera.position.x) * .05;
        this.three.camera.position.y += (- this.three.mouseY - this.three.camera.position.y) * .05;
        this.three.camera.lookAt(this.three.scene.position);
        for (let i = 0, il = this.three.spheres.length; i < il; i++) {
            let sphere = this.three.spheres[i];
            sphere.position.x = 5000 * Math.cos(timer + i);
            sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
        }
    }

    // 初始化
    public defaultThree() {

        this.three.cube.rotation.x += 0.01;
        this.three.cube.rotation.y += 0.01;

        this.three.renderer.render(this.three.scene, this.three.camera);
    }
}
