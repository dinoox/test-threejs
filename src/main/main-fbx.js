import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
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

let mixer;
const loader = new FBXLoader();
loader.load('model/fbx/Samba Dancing.fbx', function (object) {

    mixer = new THREE.AnimationMixer(object);

    const action = mixer.clipAction(object.animations[0]);
    action.play();

    object.traverse(function (child) {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    }
    );

    scene.add(object);

});


const clock = new THREE.Clock();



function render() {
    controls.update()
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()