import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

//////////POR AQUIIII: NO LO HARÉ CON UN PUNTO, LO HARÉ CON EL MOUSE.

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

const sphere_geometry = new THREE.SphereGeometry(0.1);
const material = new THREE.MeshStandardMaterial({color: 0xffffff});

for (let i = 0; i < 1000; i++) {
    const sphere = new THREE.Mesh(sphere_geometry, material);
  
    // Random positions between -25 and 25
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    const z = Math.random() * 100 - 50;
    
    sphere.position.set(x, y, z);
    scene.add(sphere);
}

//lights everything equaly
const ambienLight = new THREE.AmbientLight(0xffffff);

scene.add(ambienLight);

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

//Saves the mouse position
let mouse = new THREE.Vector2();

function onMouseMove(event) {
    let old_x = mouse.x;
    let old_y = mouse.y;

    // The position of the mouse in the middle is (0,0)
    mouse.x = -((event.clientX - window.innerWidth/2) / window.innerWidth);
    mouse.y = -((event.clientY - window.innerHeight/2) / window.innerHeight);

    //console.log({old: `(${old_x}, ${old_y})`, new: `(${mouse.x}, ${mouse.y})`});
    
    // Rota la cámara según la posición del mouse
    camera.rotation.y = mouse.x * 2;
    camera.rotation.x = mouse.y * 2;
    
    // Renderiza la escena
    renderer.render(scene, camera);

}

function onTouchMove(event) {
    // The position of the mouse in the middle is (0,0)
    mouse.x = -((event.touches[0].clientX - window.innerWidth/2) / window.innerWidth);
    mouse.y = -((event.touches[0].clientY - window.innerHeight/2) / window.innerHeight);

    // Rota la cámara según la posición del mouse
    camera.rotation.y = mouse.x * 2;
    camera.rotation.x = mouse.y * 2;
    
    // Renderiza la escena
    renderer.render(scene, camera);

}

canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('touchmove', onTouchMove, false);

renderer.render(scene, camera);

function animate(){
    requestAnimationFrame(animate);

    camera.rotation.y += 0.001;
    
    renderer.render(scene, camera);
}

//animate()