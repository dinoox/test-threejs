import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(0, 0, 60)

const baseLight = new THREE.AmbientLight(0xffffff, .6);
const directLight = new THREE.DirectionalLight(0xffffff, .6)
directLight.position.set(100, 100, 100)
scene.add(baseLight, directLight)

scene.add(new THREE.AxesHelper(100))

const renderer = new THREE.WebGL1Renderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('./TreeStump008/TreeStump008_COL_4K_SPECULAR.jpg')
const aoTexture = textureLoader.load('./TreeStump008/TreeStump008_AO_4K_SPECULAR.jpg')
const heightTexture = textureLoader.load('./TreeStump008/TreeStump008_DISP_4K_SPECULAR.jpg')
const roughnessTexture = textureLoader.load('./TreeStump008/TreeStump008_GLOSS_4K_SPECULAR.jpg')
const metalnessTexture = textureLoader.load('./TreeStump008/TreeStump008_REFL_4K_SPECULAR.jpg')
const normalTexture = textureLoader.load('./TreeStump008/TreeStump008_NRM_4K_LOD4_SPECULAR.jpg')

const loader = new FBXLoader()
loader.load("./TreeStump008/TreeStump008.fbx", (object) => {
    let mesh = object.children[0].clone()
    mesh.material = new THREE.MeshStandardMaterial({
        map: colorTexture,
        aoMap: aoTexture,
        displacementMap: heightTexture,
        displacementScale: 0.01,
        roughnessMap: roughnessTexture,
        metalnessMap: metalnessTexture,
        normalMap: normalTexture,
        side: THREE.DoubleSide
    })
    mesh.position.set(0, -15, 0)
    scene.add(mesh)
})

function render() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()