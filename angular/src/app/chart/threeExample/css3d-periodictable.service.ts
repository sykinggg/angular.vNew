import { Injectable } from '@angular/core';

import { ThreeBaseService, Css3DenderService, ImportTweenService, TrackballControlsService } from '../threeCommon';

@Injectable({
    providedIn: 'root'
})
export class Css3dPeriodictableService {

    public three: any;
    public tween: any;
    public threeContainerObj: any;

    public table = [
        "H", "Hydrogen", "1.00794", 1, 1,
        "He", "Helium", "4.002602", 18, 1,
        "Li", "Lithium", "6.941", 1, 2,
        "Be", "Beryllium", "9.012182", 2, 2,
        "B", "Boron", "10.811", 13, 2,
        "C", "Carbon", "12.0107", 14, 2,
        "N", "Nitrogen", "14.0067", 15, 2,
        "O", "Oxygen", "15.9994", 16, 2,
        "F", "Fluorine", "18.9984032", 17, 2,
        "Ne", "Neon", "20.1797", 18, 2,
        "Na", "Sodium", "22.98976...", 1, 3,
        "Mg", "Magnesium", "24.305", 2, 3,
        "Al", "Aluminium", "26.9815386", 13, 3,
        "Si", "Silicon", "28.0855", 14, 3,
        "P", "Phosphorus", "30.973762", 15, 3,
        "S", "Sulfur", "32.065", 16, 3,
        "Cl", "Chlorine", "35.453", 17, 3,
        "Ar", "Argon", "39.948", 18, 3,
        "K", "Potassium", "39.948", 1, 4,
        "Ca", "Calcium", "40.078", 2, 4,
        "Sc", "Scandium", "44.955912", 3, 4,
        "Ti", "Titanium", "47.867", 4, 4,
        "V", "Vanadium", "50.9415", 5, 4,
        "Cr", "Chromium", "51.9961", 6, 4,
        "Mn", "Manganese", "54.938045", 7, 4,
        "Fe", "Iron", "55.845", 8, 4,
        "Co", "Cobalt", "58.933195", 9, 4,
        "Ni", "Nickel", "58.6934", 10, 4,
        "Cu", "Copper", "63.546", 11, 4,
        "Zn", "Zinc", "65.38", 12, 4,
        "Ga", "Gallium", "69.723", 13, 4,
        "Ge", "Germanium", "72.63", 14, 4,
        "As", "Arsenic", "74.9216", 15, 4,
        "Se", "Selenium", "78.96", 16, 4,
        "Br", "Bromine", "79.904", 17, 4,
        "Kr", "Krypton", "83.798", 18, 4,
        "Rb", "Rubidium", "85.4678", 1, 5,
        "Sr", "Strontium", "87.62", 2, 5,
        "Y", "Yttrium", "88.90585", 3, 5,
        "Zr", "Zirconium", "91.224", 4, 5,
        "Nb", "Niobium", "92.90628", 5, 5,
        "Mo", "Molybdenum", "95.96", 6, 5,
        "Tc", "Technetium", "(98)", 7, 5,
        "Ru", "Ruthenium", "101.07", 8, 5,
        "Rh", "Rhodium", "102.9055", 9, 5,
        "Pd", "Palladium", "106.42", 10, 5,
        "Ag", "Silver", "107.8682", 11, 5,
        "Cd", "Cadmium", "112.411", 12, 5,
        "In", "Indium", "114.818", 13, 5,
        "Sn", "Tin", "118.71", 14, 5,
        "Sb", "Antimony", "121.76", 15, 5,
        "Te", "Tellurium", "127.6", 16, 5,
        "I", "Iodine", "126.90447", 17, 5,
        "Xe", "Xenon", "131.293", 18, 5,
        "Cs", "Caesium", "132.9054", 1, 6,
        "Ba", "Barium", "132.9054", 2, 6,
        "La", "Lanthanum", "138.90547", 4, 9,
        "Ce", "Cerium", "140.116", 5, 9,
        "Pr", "Praseodymium", "140.90765", 6, 9,
        "Nd", "Neodymium", "144.242", 7, 9,
        "Pm", "Promethium", "(145)", 8, 9,
        "Sm", "Samarium", "150.36", 9, 9,
        "Eu", "Europium", "151.964", 10, 9,
        "Gd", "Gadolinium", "157.25", 11, 9,
        "Tb", "Terbium", "158.92535", 12, 9,
        "Dy", "Dysprosium", "162.5", 13, 9,
        "Ho", "Holmium", "164.93032", 14, 9,
        "Er", "Erbium", "167.259", 15, 9,
        "Tm", "Thulium", "168.93421", 16, 9,
        "Yb", "Ytterbium", "173.054", 17, 9,
        "Lu", "Lutetium", "174.9668", 18, 9,
        "Hf", "Hafnium", "178.49", 4, 6,
        "Ta", "Tantalum", "180.94788", 5, 6,
        "W", "Tungsten", "183.84", 6, 6,
        "Re", "Rhenium", "186.207", 7, 6,
        "Os", "Osmium", "190.23", 8, 6,
        "Ir", "Iridium", "192.217", 9, 6,
        "Pt", "Platinum", "195.084", 10, 6,
        "Au", "Gold", "196.966569", 11, 6,
        "Hg", "Mercury", "200.59", 12, 6,
        "Tl", "Thallium", "204.3833", 13, 6,
        "Pb", "Lead", "207.2", 14, 6,
        "Bi", "Bismuth", "208.9804", 15, 6,
        "Po", "Polonium", "(209)", 16, 6,
        "At", "Astatine", "(210)", 17, 6,
        "Rn", "Radon", "(222)", 18, 6,
        "Fr", "Francium", "(223)", 1, 7,
        "Ra", "Radium", "(226)", 2, 7,
        "Ac", "Actinium", "(227)", 4, 10,
        "Th", "Thorium", "232.03806", 5, 10,
        "Pa", "Protactinium", "231.0588", 6, 10,
        "U", "Uranium", "238.02891", 7, 10,
        "Np", "Neptunium", "(237)", 8, 10,
        "Pu", "Plutonium", "(244)", 9, 10,
        "Am", "Americium", "(243)", 10, 10,
        "Cm", "Curium", "(247)", 11, 10,
        "Bk", "Berkelium", "(247)", 12, 10,
        "Cf", "Californium", "(251)", 13, 10,
        "Es", "Einstenium", "(252)", 14, 10,
        "Fm", "Fermium", "(257)", 15, 10,
        "Md", "Mendelevium", "(258)", 16, 10,
        "No", "Nobelium", "(259)", 17, 10,
        "Lr", "Lawrencium", "(262)", 18, 10,
        "Rf", "Rutherfordium", "(267)", 4, 7,
        "Db", "Dubnium", "(268)", 5, 7,
        "Sg", "Seaborgium", "(271)", 6, 7,
        "Bh", "Bohrium", "(272)", 7, 7,
        "Hs", "Hassium", "(270)", 8, 7,
        "Mt", "Meitnerium", "(276)", 9, 7,
        "Ds", "Darmstadium", "(281)", 10, 7,
        "Rg", "Roentgenium", "(280)", 11, 7,
        "Cn", "Copernicium", "(285)", 12, 7,
        "Nh", "Nihonium", "(286)", 13, 7,
        "Fl", "Flerovium", "(289)", 14, 7,
        "Mc", "Moscovium", "(290)", 15, 7,
        "Lv", "Livermorium", "(293)", 16, 7,
        "Ts", "Tennessine", "(294)", 17, 7,
        "Og", "Oganesson", "(294)", 18, 7
    ];

    constructor(
        public threeBaseService: ThreeBaseService,
        public css3DenderService: Css3DenderService,
        public importTweenService: ImportTweenService,
        public trackballControlsService: TrackballControlsService,
    ) {
        this.three = this.threeBaseService.getThreeObj();
        this.three = this.css3DenderService.defaultCss3Dender(this.three);
        this.three = this.trackballControlsService.defaultTrackballControls(this.three);

        this.tween = this.importTweenService.getTweenObj();

        this.three.objects = [];
        this.three.targets = {
            table: [],
            sphere: [],
            helix: [],
            grid: [],
        };
    }

    public init(threeContainerObj: any) {
        this.threeContainerObj = threeContainerObj;
        this.three.camera = new this.three.PerspectiveCamera(40, (threeContainerObj.width || window.innerWidth) / (threeContainerObj.height || window.innerHeight), 1, 10000);
        this.three.camera.position.z = 3000;

        this.three.scene = new this.three.Scene();

        // table

        for (let i = 0; i < this.table.length; i += 5) {

            let element = document.createElement('div');
            element.className = 'element';
            element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
            const elementStyle = {
                width: '120px',
                height: '160px',
                boxShadow: '0px 0px 12px rgba(0,255,255,0.5)',
                border: '1px solid rgba(127,255,255,0.25)',
                textAlign: 'center',
                cursor: 'default',
            }
            this.defaultStyle(elementStyle, element);
            

            let number = document.createElement('div');
            number.className = 'number';
            number.textContent = (i / 5) + 1 + '';
            const numberStyle = {
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '12px',
                color: 'rgba(127,255,255,0.75)',
            }
            this.defaultStyle(numberStyle, number);
            element.appendChild(number);

            let symbol = document.createElement('div');
            symbol.className = 'symbol';
            symbol.textContent = this.table[i] + '';
            const symbolStyle = {
                position: 'absolute',
                top: '40px',
                left: '0px',
                right: '0px',
                fontSize: '60px',
                fontWeight: 'bold',
                color: 'rgba(255,255,255,0.75)',
                textShadow: '0 0 10px rgba(0,255,255,0.95)',
            }
            this.defaultStyle(symbolStyle, symbol);
            element.appendChild(symbol);

            let details = document.createElement('div');
            details.className = 'details';
            details.innerHTML = this.table[i + 1] + '<br>' + this.table[i + 2];
            const detailsStyle = {
                position: 'absolute',
                bottom: '15px',
                left: '0px',
                right: '0px',
                fontSize: '12px',
                color: 'rgba(127,255,255,0.75)',
            }
            this.defaultStyle(detailsStyle, details);
            element.appendChild(details);

            let objectCSS3D = new this.three.CSS3DObject(element);
            objectCSS3D.position.x = Math.random() * 4000 - 2000;
            objectCSS3D.position.y = Math.random() * 4000 - 2000;
            objectCSS3D.position.z = Math.random() * 4000 - 2000;
            this.three.scene.add(objectCSS3D);

            this.three.objects.push(objectCSS3D);

            //

            let object = new this.three.Object3D();
            object.position.x = (+this.table[i + 3] * 140) - 1330;
            object.position.y = - (+this.table[i + 4] * 180) + 990;

            this.three.targets.table.push(object);

        }

        // sphere

        let sphereVector = new this.three.Vector3();

        for (let i = 0, l = this.three.objects.length; i < l; i++) {

            let phi = Math.acos(- 1 + (2 * i) / l);
            let theta = Math.sqrt(l * Math.PI) * phi;

            let object = new this.three.Object3D();

            object.position.setFromSphericalCoords(800, phi, theta);

            sphereVector.copy(object.position).multiplyScalar(2);

            object.lookAt(sphereVector);

            this.three.targets.sphere.push(object);

        }

        // helix

        let helixVector = new this.three.Vector3();

        for (let i = 0, l = this.three.objects.length; i < l; i++) {

            let theta = i * 0.175 + Math.PI;
            let y = - (i * 8) + 450;

            let object = new this.three.Object3D();

            object.position.setFromCylindricalCoords(900, theta, y);

            helixVector.x = object.position.x * 2;
            helixVector.y = object.position.y;
            helixVector.z = object.position.z * 2;

            object.lookAt(helixVector);

            this.three.targets.helix.push(object);

        }

        // grid

        for (let i = 0; i < this.three.objects.length; i++) {

            let object = new this.three.Object3D();

            object.position.x = ((i % 5) * 400) - 800;
            object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
            object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

            this.three.targets.grid.push(object);

        }

        //

        this.three.renderer = new this.three.CSS3DRenderer();
        this.three.renderer.setSize((threeContainerObj.width || window.innerWidth), (threeContainerObj.height || window.innerHeight));
        document.getElementById('container').appendChild(this.three.renderer.domElement);

        //

        this.three.controls = new this.three.TrackballControls(this.three.camera, this.three.renderer.domElement);
        this.three.controls.rotateSpeed = 0.5;
        this.three.controls.minDistance = 500;
        this.three.controls.maxDistance = 6000;
        this.three.controls.addEventListener('change', this.render.bind(this));

        let button1 = document.getElementById('table');
        button1.addEventListener('click', function () {

            this.transform(this.three.targets.table, 2000);

        }.bind(this), false);

        let button2 = document.getElementById('sphere');
        button2.addEventListener('click', function () {

            this.transform(this.three.targets.sphere, 2000);

        }.bind(this), false);

        let button3 = document.getElementById('helix');
        button3.addEventListener('click', function () {

            this.transform(this.three.targets.helix, 2000);

        }.bind(this), false);

        let button4 = document.getElementById('grid');
        button4.addEventListener('click', function () {

            this.transform(this.three.targets.grid, 2000);

        }.bind(this), false);

        this.transform(this.three.targets.table, 2000);

        //

        window.addEventListener('resize', this.onWindowResize, false);

    }

    public defaultStyle(styleObj, element) {
        for (let i in styleObj) {
            element.style[i] = styleObj[i];
        }
    }


    public transform(targets, duration) {

        this.tween.removeAll();

        for (let i = 0; i < this.three.objects.length; i++) {

            let object = this.three.objects[i];
            let target = targets[i];

            new this.tween.Tween(object.position)
                .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                .easing(this.tween.Easing.Exponential.InOut)
                .start();

            new this.tween.Tween(object.rotation)
                .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                .easing(this.tween.Easing.Exponential.InOut)
                .start();

        }

        new this.tween.Tween(this)
            .to({}, duration * 2)
            .onUpdate(this.render.bind(this))
            .start();

    }

    public onWindowResize() {

        this.three.camera.aspect = (this.threeContainerObj.width || window.innerWidth) / (this.threeContainerObj.height || window.innerHeight);
        this.three.camera.updateProjectionMatrix();

        this.three.renderer.setSize((this.threeContainerObj.width || window.innerWidth), (this.threeContainerObj.height || window.innerHeight));

        this.render();

    }

    public animate() {

        window['requestAnimFrame'](this.animate.bind(this));

        this.tween.update();

        this.three.controls.update();

    }

    public render() {

        this.three.renderer.render(this.three.scene, this.three.camera);

    }



}
