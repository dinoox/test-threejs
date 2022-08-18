import gasp from "gsap"
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

const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0xffff00 }))

scene.add(cube, new THREE.AxesHelper(5))

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

let animatePosition = gasp.to(cube.position, {
    x: 5,
    delay: 2,
    repeat: 2, //-1 infinite
    yoyo: true, // back 
    duration: 5,
    ease: "Power1.easeInOut",
    onComplete: () => console.log(1)
})
gasp.to(cube.rotation, { x: 2 * Math.PI, duration: 5 })


window.addEventListener('click', () => {
    if (animatePosition.isActive())
        animatePosition.pause()
    else
        animatePosition.resume()
})

window.addEventListener('resize', () => {
    camera.updateProjectionMatrix()
    camera.aspect = window.innerWidth / window.innerHeight
    
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
})

window.addEventListener('dblclick', () => {
    if (document.fullscreenElement)
        document.exitFullscreen()
    else
        renderer.domElement.requestFullscreen()
})


function render(time) {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()


// const clock = new THREE.Clock()
// cube.position.x += 0.01
// cube.scale.x = 2
// cube.rotation.set(Math.PI / 4, 0, 0, "XZY")
// cube.position.x = (time / 1000) * 1
// cube.position.x = (clock.getElapsedTime() % 5) * 1