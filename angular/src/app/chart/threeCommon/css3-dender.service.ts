import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Css3DenderService {

    public three: any;

    constructor() { }

    public defaultCss3Dender(three?) {

        three.CSS3DObject = function (element) {

            three.Object3D.call(this);

            this.element = element;
            this.element.style.position = 'absolute';

            this.addEventListener('removed', function () {

                if (this.element.parentNode !== null) {

                    this.element.parentNode.removeChild(this.element);

                }

            });

        }

        three.CSS3DObject.prototype = Object.create(three.Object3D.prototype);
        three.CSS3DObject.prototype.constructor = three.CSS3DObject;

        three.CSS3DSprite = function (element) {

            three.CSS3DObject.call(this, element);

        };

        three.CSS3DSprite.prototype = Object.create(three.CSS3DObject.prototype);
        three.CSS3DSprite.prototype.constructor = three.CSS3DSprite;

        three.CSS3DRenderer = function () {

            let _width, _height;
            let _widthHalf, _heightHalf;

            let matrix = new three.Matrix4();

            let cache = {
                camera: { fov: 0, style: '' },
                objects: new WeakMap()
            };

            let domElement = document.createElement('div');
            domElement.style.overflow = 'hidden';

            this.domElement = domElement;

            let cameraElement = document.createElement('div');

            cameraElement.style.webkitTransformStyle = 'preserve-3d';
            cameraElement.style.transformStyle = 'preserve-3d';

            domElement.appendChild(cameraElement);

            let isIE = /Trident/i.test(navigator.userAgent);

            this.getSize = function () {

                return {
                    width: _width,
                    height: _height
                };

            };

            this.setSize = function (width, height) {

                _width = width;
                _height = height;
                _widthHalf = _width / 2;
                _heightHalf = _height / 2;

                domElement.style.width = width + 'px';
                domElement.style.height = height + 'px';

                cameraElement.style.width = width + 'px';
                cameraElement.style.height = height + 'px';

            };

            function epsilon(value) {

                return Math.abs(value) < 1e-10 ? 0 : value;

            }

            function getCameraCSSMatrix(matrix) {

                let elements = matrix.elements;

                return 'matrix3d(' +
                    epsilon(elements[0]) + ',' +
                    epsilon(- elements[1]) + ',' +
                    epsilon(elements[2]) + ',' +
                    epsilon(elements[3]) + ',' +
                    epsilon(elements[4]) + ',' +
                    epsilon(- elements[5]) + ',' +
                    epsilon(elements[6]) + ',' +
                    epsilon(elements[7]) + ',' +
                    epsilon(elements[8]) + ',' +
                    epsilon(- elements[9]) + ',' +
                    epsilon(elements[10]) + ',' +
                    epsilon(elements[11]) + ',' +
                    epsilon(elements[12]) + ',' +
                    epsilon(- elements[13]) + ',' +
                    epsilon(elements[14]) + ',' +
                    epsilon(elements[15]) +
                    ')';

            }

            function getObjectCSSMatrix(matrix, cameraCSSMatrix) {

                let elements = matrix.elements;
                let matrix3d = 'matrix3d(' +
                    epsilon(elements[0]) + ',' +
                    epsilon(elements[1]) + ',' +
                    epsilon(elements[2]) + ',' +
                    epsilon(elements[3]) + ',' +
                    epsilon(- elements[4]) + ',' +
                    epsilon(- elements[5]) + ',' +
                    epsilon(- elements[6]) + ',' +
                    epsilon(- elements[7]) + ',' +
                    epsilon(elements[8]) + ',' +
                    epsilon(elements[9]) + ',' +
                    epsilon(elements[10]) + ',' +
                    epsilon(elements[11]) + ',' +
                    epsilon(elements[12]) + ',' +
                    epsilon(elements[13]) + ',' +
                    epsilon(elements[14]) + ',' +
                    epsilon(elements[15]) +
                    ')';

                if (isIE) {

                    return 'translate(-50%,-50%)' +
                        'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)' +
                        cameraCSSMatrix +
                        matrix3d;

                }

                return 'translate(-50%,-50%)' + matrix3d;

            }

            function renderObject(object, camera, cameraCSSMatrix) {

                if (object instanceof three.CSS3DObject) {

                    let style;

                    if (object instanceof three.CSS3DSprite) {

                        // http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

                        matrix.copy(camera.matrixWorldInverse);
                        matrix.transpose();
                        matrix.copyPosition(object.matrixWorld);
                        matrix.scale(object.scale);

                        matrix.elements[3] = 0;
                        matrix.elements[7] = 0;
                        matrix.elements[11] = 0;
                        matrix.elements[15] = 1;

                        style = getObjectCSSMatrix(matrix, cameraCSSMatrix);

                    } else {

                        style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix);

                    }

                    let element = object.element;
                    let cachedStyle = cache.objects.get(object);

                    if (cachedStyle === undefined || cachedStyle !== style) {

                        element.style.WebkitTransform = style;
                        element.style.transform = style;

                        let objectData = { style: style };

                        if (isIE) {

                            objectData['distanceToCameraSquared'] = getDistanceToSquared(camera, object);

                        }

                        cache.objects.set(object, objectData);

                    }

                    if (element.parentNode !== cameraElement) {

                        cameraElement.appendChild(element);

                    }

                }

                for (let i = 0, l = object.children.length; i < l; i++) {

                    renderObject(object.children[i], camera, cameraCSSMatrix);

                }

            }

            let getDistanceToSquared = function () {

                let a = new three.Vector3();
                let b = new three.Vector3();

                return function (object1, object2) {

                    a.setFromMatrixPosition(object1.matrixWorld);
                    b.setFromMatrixPosition(object2.matrixWorld);

                    return a.distanceToSquared(b);

                };

            }();

            function filterAndFlatten(scene) {

                let result = [];

                scene.traverse(function (object) {

                    if (object instanceof three.CSS3DObject) { result.push(object); }

                });

                return result;

            }

            function zOrder(scene) {

                let sorted = filterAndFlatten(scene).sort(function (a, b) {

                    let distanceA = cache.objects.get(a).distanceToCameraSquared;
                    let distanceB = cache.objects.get(b).distanceToCameraSquared;

                    return distanceA - distanceB;

                });

                let zMax = sorted.length;

                for (let i = 0, l = sorted.length; i < l; i++) {

                    sorted[i].element.style.zIndex = zMax - i;

                }

            }

            this.render = function (scene, camera) {

                let fov = camera.projectionMatrix.elements[5] * _heightHalf;

                if (cache.camera.fov !== fov) {

                    if (camera.isPerspectiveCamera) {

                        domElement.style.webkitPerspective = fov + 'px';
                        domElement.style.perspective = fov + 'px';

                    }

                    cache.camera.fov = fov;

                }

                scene.updateMatrixWorld();

                if (camera.parent === null) { camera.updateMatrixWorld(); }

                let tx, ty;
                if (camera.isOrthographicCamera) {

                    tx = - (camera.right + camera.left) / 2;
                    ty = (camera.top + camera.bottom) / 2;

                }

                let cameraCSSMatrix = camera.isOrthographicCamera ?
                    'scale(' + fov + ')' + 'translate(' + epsilon(tx) + 'px,' + epsilon(ty) + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse) :
                    'translateZ(' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse);

                let style = cameraCSSMatrix +
                    'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)';

                if (cache.camera.style !== style && !isIE) {

                    cameraElement.style.webkitTransform = style;
                    cameraElement.style.transform = style;

                    cache.camera.style = style;

                }

                renderObject(scene, camera, cameraCSSMatrix);

                if (isIE) {

                    // IE10 and 11 does not support 'preserve-3d'.
                    // Thus, z-order in 3D will not work.
                    // We have to calc z-order manually and set CSS z-index for IE.
                    // FYI: z-index can't handle object intersection
                    zOrder(scene);

                }

            };

        };

        this.three = three;

        return this.three;
    }
}
