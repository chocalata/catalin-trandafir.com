import * as THREE from 'three';
import { OrbitControls } from '/lib/three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#bg');

//Container of the objects, camera and lights
const scene = new THREE.Scene();

//Perspective camera is like a human view. (grados o campo de vision, proporción dependiendo de la pantalla del usuario, profundidad desde, profundidad hasta)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//rederiza los graficos a la escena.
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

//Cantidad de pixeles del dispositivo
renderer.setPixelRatio(window.devicePixelRatio);

//tamaño de la pantalla
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(60);

const geometry = new THREE.SphereGeometry(0.5); //new THREE.TorusGeometry(10, 3, 16, 100); /////OBJETIVO: GENERAR UN MAPA CON ESTRELLAS
//Basic Material dont let the light bouce out of it
//const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial({color: 0xffffff});
const figure = new THREE.Mesh( geometry, material)
figure.position.set(5,5,5)
scene.add(figure)


//light point to everywhere from the position
//const pointLight = new THREE.PointLight(0xffffff);
//pointLight.position.set(20,20,20);

//lights everything equaly
const ambienLight = new THREE.AmbientLight(0xffffff);

scene.add(/*pointLight, */ambienLight);


/**
 * HELPING TOOLS
 */
//Helps showing que light and direction of it
//const lightHelper = new THREE.PointLightHelper(pointLight);

//Helps showing a grid into the scene.
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(/*lightHelper, */gridHelper);

////////////////////////////////////////////

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame(animate);

    //figure.rotation.x += 0.01;
    //figure.rotation.y += 0.001;
    //figure.rotation.z += 0.01;

    controls.update();
    //camera.translateZ(-0.01)
    
    renderer.render(scene, camera);
}

//size of the camera and renderer depending on the size of the screen.
window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    },
    false
)

animate()