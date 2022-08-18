import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(0, 0, 10)

const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('./ground/GroundForest003_COL_VAR1_3K.jpg')
const aoTexture = textureLoader.load('./ground/GroundForest003_AO_3K.jpg')
const heightTexture = textureLoader.load('./ground/GroundForest003_DISP_3K.jpg')
const roughnessTexture = textureLoader.load('./ground/GroundForest003_GLOSS_3K.jpg')
const metalnessTexture = textureLoader.load('./ground/GroundForest003_REFL_3K.jpg')
const normalTexture = textureLoader.load('./ground/GroundForest003_NRM_3K.jpg')

// const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100)
const cubeGeometry = new THREE.SphereBufferGeometry(1, 1000, 1000)
cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

const standardMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    aoMap: aoTexture,
    displacementMap: heightTexture,
    displacementScale: 0.025,
    roughnessMap: roughnessTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalTexture,
    side: THREE.DoubleSide
})




const baseLight = new THREE.AmbientLight(0xffffff, .5);
const directLight = new THREE.DirectionalLight(0xffffff, .5)
directLight.position.set(10, 10, 10)
scene.add(baseLight, directLight)

scene.add(new THREE.AxesHelper(5))
scene.add(new THREE.Mesh(cubeGeometry, standardMaterial))

const renderer = new THREE.WebGL1Renderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true






function render(time) {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()