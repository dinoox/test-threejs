import * as THREE from "three"
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
)

camera.position.set(100, 300, 400);


const baseLight = new THREE.AmbientLight(0xffffff, .6);
const directLight = new THREE.DirectionalLight(0xffffff, .6)
directLight.position.set(100, 100, 100)
scene.add(baseLight, directLight)

scene.add(new THREE.AxesHelper(200))

const renderer = new THREE.WebGL1Renderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

//Setup IFC Loader
const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath( './' );
ifcLoader.load('model/ifc/rac_advanced_sample_project.ifc', function (model) {
    scene.add(model.mesh);
});



function render() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()