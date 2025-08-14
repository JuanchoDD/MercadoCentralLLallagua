import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.116.1/build/three.module.js";
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.116.1/examples/jsm/controls/OrbitControls.js";

var scene;
var camera;
var renderer;
var fbxObject;

function push_model_fbx(px, py, pz, tam, modelo) {
  const fbxloader = new FBXLoader();
  fbxloader.load(modelo, function (fbx) {
    fbx.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    fbx.scale.set(tam, tam, tam);
    fbx.position.set(px, py, pz);
    scene.add(fbx);
    fbxObject = fbx; 
  });
}
function push_point_light(color, intensity, px, py, pz) {
  const lightP = new THREE.PointLight(color, intensity);
  lightP.position.set(px, py, pz);
  scene.add(lightP);


  

}
function set_background_image(imageURL) {
  const textureLoader = new THREE.TextureLoader();
  const backgroundTexture = textureLoader.load("https://cdn.glitch.global/32780752-39f7-4f3e-9a2b-0ba537155738/Sala3.jpg?v=1724895218249");
  scene.background = backgroundTexture;
}
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  push_point_light(0xFFFFFF, 0.8, 4, 3, 5);
  
 set_background_image('https://path/to/your/background-image.jpg'); // Imagen de fondo estática
  
  push_model_fbx(-4, 1.5, 0, 0.008, "https://cdn.glitch.global/32780752-39f7-4f3e-9a2b-0ba537155738/escudo%20odonto14.fbx?v=1724824265893");
  
  // Para controlar con el Mouse
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();
}

function animate() {
  requestAnimationFrame(animate);

  if (fbxObject) {
    fbxObject.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

init();
animate();
